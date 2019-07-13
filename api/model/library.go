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

// LibraryBook represents a book in a User's Library
type LibraryBook struct {
	BookID     string `json:"id"`
	ReadingNow bool   `json:"reading_now"` // is the user reading now? default false
	Favorite   bool   `json:"favorite"`    // is this book a user's favorite? default to false

	ClosingThoughts BookReview `json:"closing_thoughts"` // optional a user's closing thoughts about the book , maybe a rating?
	BookSummary     string     `json:"book_summary"`     // optional	- final summary of the book
	LessonsLearned  []Note     `json:"lessons_learned"`  // optional - list of concepts ex) * Big Bang Theory - description of a big bang - pg. 32
	SectionNotes    []Note     `json:"section_notes"`    // optional - note about a particular section ex) Introduction - intro notes...
	// Quotes        []Note          `json:"quotes"`         // optional - list of quotes

	// Category    string    `json:"category"`     // optional - some sort of category given by user, default to ""
	LastUpdated time.Time `json:"last_updated"` // last time something was changed or moved
}

// BookReview holds final thoughts and a rating for a LibraryBook
type BookReview struct {
	Review string `json:"review"`
	Rating int8   `json:"rating"`
}

// Note represents something you can write about a book - SectionNote, Concept, Quote
type Note struct {
	Title     string    `json:"title"`
	Notes     string    `json:"notes"`
	Section   string    `json:"section"`
	Highlight bool      `json:"highlight"`
	Timestamp time.Time `json:"timestamp"`
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
		SectionNotes:    []Note{},
		LessonsLearned:  []Note{},

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

// removeFromSlice removes a string from a list of strings - v useful :)
func removeFromReadingList(readingList []LibraryBook, toRemoveID string) ([]LibraryBook, error) {
	i := -1
	for index, item := range readingList {
		if item.BookID == toRemoveID {
			i = index
		}
	}

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
