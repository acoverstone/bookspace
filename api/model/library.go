package model

// Library represents all of the book info for a particular user
type Library struct {
	UserID      uint64   `json:"id"`
	ToReadList  []string `json:"to_read_list"`
	ReadingList []string `json:"read_list"`
}

// LibraryBook represents a book in a User's Library
type LibraryBook struct {
	BookID        string
	ReadingNow    bool
	Favorite      bool
	FinalThoughts string
	BookSummary   string
	SectionNotes  []string
	Quotes        []string
}
