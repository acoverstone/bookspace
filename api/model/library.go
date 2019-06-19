package model

import "time"

// Library represents all of the book info for a particular user
type Library struct {
	ToReadList  []string      `json:"to_read_list"`
	ReadingList []LibraryBook `json:"read_list"`
}

// LibraryBook represents a book in a User's Library
type LibraryBook struct {
	BookID        string    `json:"id"`
	ReadingNow    bool      `json:"reading_now"`    // is the user reading now? default false
	Favorite      bool      `json:"favorite"`       // is this book a user's favorite? default to false
	FinalThoughts string    `json:"final_thoughts"` // optional a user's closing thoughts about the book , maybe a rating?
	BookSummary   string    `json:"book_summary"`   // optional	- final summary of the book
	SectionNotes  []Note    `json:"section_notes"`  // optional - note about a particular section ex) Introduction - intro notes...
	Concepts      []Note    `json:"concepts"`       // optional - list of concepts ex) * Big Bang Theory - description of a big bang - pg. 32
	Quotes        []Note    `json:"quotes"`         // optional - list of quotes
	Category      string    `json:"category"`       // optional - some sort fo category given by user, default to ""
	LastUpdated   time.Time `json:"last_updated"`   // last time something was changed or moved
}

// Note represents something you can write about a book - SecitonNote, Concept, Quote
type Note struct {
	Title      string   `json:"title"`
	Notes      []string `json:"notes"`
	PageNumber int32    `json:"section_name"`
	Highlight  bool     `json:"highlight"`
	// Timestamp  time.Time `json:"timestamp"`
}

// AddBookToReadList appends book to reading list
func AddBookToReadList(userID uint64, bookID string) {

}
