package model

import (
	"fmt"
	"time"
)

// Library represents all of the book info for a particular user
type Library struct {
	ToReadList  []string      `json:"to_read_list"`
	ReadingList []LibraryBook `json:"read_list"`
}

// AddBookToReadList appends book to 'To-Read' list
func AddBookToReadList(userID uint64, bookID string) error {

	key := getKeyFromUserID(userID)
	_, err := db.MutateIn(key, 0, 0).ArrayAddUnique("library.to_read_list", bookID, false).Execute()

	if err != nil {
		return fmt.Errorf(err.Error())
	}
	return nil
}

// RemoveBookFromToReadList removes book from 'To-Read' list
func RemoveBookFromToReadList(userID uint64, bookID string) error {

	key := getKeyFromUserID(userID)
	user := User{}
	_, err := db.Get(key, &user)

	if err != nil {
		return fmt.Errorf(err.Error())
	}

	newToReadList, err := removeFromSlice(user.Library.ToReadList, bookID)
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace("library.to_read_list", newToReadList).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	return nil
}

// AddBookReadAlreadyList appends book to 'Read Already' list
func AddBookReadAlreadyList(userID uint64, bookID string) (*LibraryBook, error) {

	key := getKeyFromUserID(userID)

	// Create new LibraryBook object to insert to DB
	book := LibraryBook{
		BookID:     bookID,
		ReadingNow: false,
		Favorite:   false,

		ClosingThoughts: BookReview{},
		BookSummary:     "",
		SectionNotes:    []SectionNote{},
		LessonsLearned:  []Lesson{},

		// Quotes:        []Note{},
		// Category:      "",
		LastUpdated: time.Now(),
	}

	_, err := db.MutateIn(key, 0, 0).ArrayAppend("library.read_list", book, false).Execute()

	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}
	return &book, nil
}

// RemoveBookFromReadAlreadyList removes book from 'Read Already' list
func RemoveBookFromReadAlreadyList(userID uint64, bookID string) error {

	key := getKeyFromUserID(userID)
	user := User{}
	_, err := db.Get(key, &user)

	if err != nil {
		return fmt.Errorf(err.Error())
	}

	newReadList, err := removeFromReadingList(user.Library.ReadingList, bookID)
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace("library.read_list", newReadList).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	return nil
}

func getIndexFromReadingList(readingList []LibraryBook, toRemoveID string) int {
	i := -1
	for index, item := range readingList {
		if item.BookID == toRemoveID {
			i = index
		}
	}
	return i
}

// removeFromSlice removes a string from a list of strings - v useful :)
func removeFromReadingList(readingList []LibraryBook, toRemoveID string) ([]LibraryBook, error) {
	i := getIndexFromReadingList(readingList, toRemoveID)

	if i == -1 {
		return nil, fmt.Errorf("%v not found in list", toRemoveID)
	}

	readingList[i] = readingList[len(readingList)-1]
	return readingList[:len(readingList)-1], nil
}

// removeFromSlice removes a string from a list of strings - v useful :)
func removeFromSlice(s []string, toRemove string) ([]string, error) {
	i := -1
	for index, item := range s {
		if item == toRemove {
			i = index
		}
	}

	if i == -1 {
		return nil, fmt.Errorf("%v not found in list", toRemove)
	}

	s[i] = s[len(s)-1]
	return s[:len(s)-1], nil
}
