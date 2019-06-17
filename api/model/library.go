package model

// Library represents all of the book info for a particular user
type Library struct {
	ToReadList  []LibraryBook `json:"to_read_list"`
	ReadingList []LibraryBook `json:"read_list"`
}

// LibraryBook represents a book in a User's Library
type LibraryBook struct {
	BookID        string   `json:"id"`
	ReadingNow    bool     `json:"reading_now"`
	Favorite      bool     `json:"favorite"`
	FinalThoughts string   `json:"final_thoughts"`
	BookSummary   string   `json:"book_summary"`
	SectionNotes  []string `json:"section_notes"`
	Quotes        []string `json:"quotes"`
}
