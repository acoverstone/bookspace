package model

import (
	"strings"

	"github.com/JesusIslam/tldr"
)

// Book is a struct defining values needed from Google Books API response.
type Book struct {
	BookID        string
	Title         string
	Subtitle      string
	Authors       []string
	PublishedDate string
	Description   string
	Categories    []string
	PageCount     float64
	Rating        float64
	Image         string
	Language      string
	EpubAvailable bool
}

// GetSummary returns a summary of a book's description
func (b Book) GetSummary() string {
	bag := tldr.New()
	result, err := bag.Summarize(b.Description, 1)
	if err != nil {
		return b.Description
	}

	return strings.Join(result, " ")
}
