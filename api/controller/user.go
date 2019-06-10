package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"projects/bookcase/api/model"
)

type user struct{}

const sessionKey = "user_id"

func (u user) registerRoutes() {
	http.HandleFunc("/api/login", u.handleLogin)
	http.HandleFunc("/api/logout", u.handleLogout)
	http.HandleFunc("/api/signup", u.handleSignup)
}

func (u user) handleLogin(w http.ResponseWriter, r *http.Request) {
	sess := sessionManager.SessionStart(w, r)
	enc := json.NewEncoder(w)

	// For a GET request - called on component load of main page
	if r.Method == http.MethodGet {
		// Return OK if user not found or user successfully found - Unauthorized if no ID is invalid
		if userID, ok := sess.Get(sessionKey).(uint64); !ok {
			fmt.Println("No current user.")
			w.WriteHeader(http.StatusOK)
			enc.Encode(model.User{})
			return
		} else {
			user, err := model.GetUserByID(userID)
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				enc.Encode(model.User{})
				return
			}
			w.WriteHeader(http.StatusOK)
			enc.Encode(user)
			return
		}

	} else if r.Method == http.MethodPost {
		// Else for a POST request - check credentials and return user and cookie session

		// Parse email/pass from req body
		dec := json.NewDecoder(r.Body)
		var loginInfo struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		err := dec.Decode(&loginInfo)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			enc.Encode(model.User{})
			return
		}

		// If login is successful return user, else return correct error
		user, err := model.Login(loginInfo.Email, loginInfo.Password)
		if err == nil {
			sess.Set(sessionKey, user.UserID)
			w.WriteHeader(http.StatusOK)
			enc.Encode(user)
			return
		} else if err.Error() == "incorrect password" {
			w.WriteHeader(http.StatusUnauthorized)
			enc.Encode(model.User{})
			return
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			enc.Encode(model.User{})
			return
		}

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

func (u user) handleLogout(w http.ResponseWriter, r *http.Request) {
	sessionManager.SessionDestroy(w, r)
	w.WriteHeader(http.StatusOK)
}

// Creates a new User object in the DB and returns User with a session ID in the cookie
func (u user) handleSignup(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// Parse request
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var user struct {
			FirstName string `json:"first_name"`
			Email     string `json:"email"`
			Password  string `json:"password"`
		}
		err := dec.Decode(&user)
		if err != nil {
			fmt.Printf("Error parsing signup request: %v\n", err)
			w.WriteHeader(http.StatusUnprocessableEntity)
			enc.Encode(model.User{})
			return
		}

		// Create a new user and push to CB
		newUser, err := model.Signup(user.FirstName, user.Email, user.Password)
		if err != nil {
			fmt.Printf("Error writing user to DB: %v\n", err)
			if err.Error() == "email exists" {
				w.WriteHeader(http.StatusUnprocessableEntity)
			} else {
				w.WriteHeader(http.StatusInternalServerError)
			}
			enc.Encode(model.User{})
			return
		}

		// Create and set session for user - writes session number to cookie
		sess := sessionManager.SessionStart(w, r)
		sess.Set(sessionKey, newUser.UserID)

		// Return new user as JSON
		w.WriteHeader(http.StatusOK)
		enc.Encode(newUser)
	} else {
		// Return 405 if not POST
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}
