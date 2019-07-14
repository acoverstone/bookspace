package model

import (
	"fmt"
	"time"
)

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
	Title     string `json:"title"`
	Notes     string `json:"notes"`
	Section   string `json:"section"`
	Highlight bool   `json:"highlight"`
}

// AddClosingThoughts appends book to 'Reading' list
func AddClosingThoughts(userID uint64, bookID string, review string, rating int8) error {

	key := getKeyFromUserID(userID)
	user := User{}
	_, err := db.Get(key, &user)

	if err != nil {
		return fmt.Errorf(err.Error())
	}

	readingList := user.Library.ReadingList
	i := getIndexFromReadingList(readingList, bookID)

	if i == -1 {
		return fmt.Errorf("book not found in reading list")
	}

	// Create new LibraryBook object to insert to DB
	bookReview := BookReview{
		Review: review,
		Rating: rating,
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].closing_thoughts", i), bookReview).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}
	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}

// AddBookSummary appends book to 'Reading' list
func AddBookSummary(userID uint64, bookID string, summary string) error {

	key := getKeyFromUserID(userID)
	user := User{}
	_, err := db.Get(key, &user)

	if err != nil {
		return fmt.Errorf(err.Error())
	}

	readingList := user.Library.ReadingList
	i := getIndexFromReadingList(readingList, bookID)

	if i == -1 {
		return fmt.Errorf("book not found in reading list")
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].book_summary", i), summary).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println(time.Now())
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}
