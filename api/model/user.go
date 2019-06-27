package model

import (
	"crypto/sha512"
	"encoding/base64"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

var passwordSalt = os.Getenv("BOOKS_PASS_SALT")

// User represents a user of the application - containing a library
type User struct {
	UserID         uint64    `json:"id"`
	Type           string    `json:"type"`
	FirstName      string    `json:"first_name"`
	Email          string    `json:"email"`
	Password       string    `json:"password"`
	LastLogin      time.Time `json:"last_login"`
	RecentSearches []string  `json:"recent_searches"`
	Library        Library   `json:"library"`
}

// EmailRef represents a reference document for looking up a user by email - ensures unique
type EmailRef struct {
	Email  string `json:"email"`
	UserID uint64 `json:"user_id"`
}

// GetUserByID returns user object from given ID object
func GetUserByID(id uint64) (*User, error) {
	user := User{}
	_, err := db.Get(getKeyFromUserID(id), &user)
	return &user, err
}

// Login gets a User object from DB if Password is correct - throws error otherwise
func Login(email, password string) (*User, error) {
	user := User{}
	emailRef := EmailRef{}

	// Get User from db by email
	_, err := db.Get(getEmailRefKey(email), &emailRef)
	if err != nil {
		return nil, fmt.Errorf("email does not exist in db")
	}
	userKey := getKeyFromUserID(emailRef.UserID)
	_, err = db.Get(userKey, &user)
	if err != nil {
		return nil, fmt.Errorf("cannot parse user")
	}

	// Check if given email/password matches for email/password in DB
	if hashPass(email, password) != user.Password {
		return nil, fmt.Errorf("incorrect password")
	}

	// Update last login time for user - doesn't need to return an error if there is none
	user.LastLogin = time.Now()
	_, err = db.MutateIn(userKey, 0, 0).Replace("last_login", time.Now()).Execute()
	if err != nil {
		fmt.Println("Error updating last login time")
	}

	return &user, nil
}

// Signup creates (and returns) a User object in DB
func Signup(firstName, email, password string) (*User, error) {

	newID, _, err := db.Counter("user_id_counter", 1, 1, 0)
	if err != nil {
		return nil, fmt.Errorf("error getting user id count from bucket")
	}

	library := Library{
		ToReadList:  []string{},
		ReadingList: []LibraryBook{},
	}

	// Create user object
	newUser := User{
		UserID:         newID,
		Type:           "user",
		FirstName:      strings.Title(firstName),
		Email:          strings.ToLower(email),
		Password:       hashPass(email, password),
		LastLogin:      time.Now(),
		RecentSearches: []string{},
		Library:        library,
	}
	key := getKeyFromUserID(newID)

	// Create email lookup to ensure unique email
	emailRef := EmailRef{
		Email:  newUser.Email,
		UserID: newUser.UserID,
	}
	emailRefKey := getEmailRefKey(newUser.Email)

	// Store email reference in document - (check if email is unique - return error otherwise)
	_, err = db.Insert(emailRefKey, emailRef, 0)
	if err != nil {
		return nil, fmt.Errorf("email exists")
	}

	// Store user in database
	_, err = db.Insert(key, newUser, 0)
	if err != nil {
		return nil, fmt.Errorf("error inserting user to bucket")
	}

	return &newUser, nil
}

func getKeyFromUserID(userID uint64) string {
	return "user_" + strconv.FormatUint(userID, 10)
}

func getEmailRefKey(email string) string {
	return "email::" + strings.ToLower(email)
}

// hashPass uses passowrd salt and email to encode password before storing/for validations
func hashPass(email, password string) string {
	hasher := sha512.New()
	hasher.Write([]byte(os.Getenv("BOOKS_PASS_SALT")))
	hasher.Write([]byte(email))
	hasher.Write([]byte(password))
	pwd := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	return pwd
}
