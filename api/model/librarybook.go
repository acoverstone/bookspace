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

	ClosingThoughts BookReview    `json:"closing_thoughts"` // optional a user's closing thoughts about the book , maybe a rating?
	BookSummary     string        `json:"book_summary"`     // optional	- final summary of the book
	LessonsLearned  []Lesson      `json:"lessons"`          // optional - list of concepts ex) * Big Bang Theory - description of a big bang - pg. 32
	SectionNotes    []SectionNote `json:"section_notes"`    // optional - note about a particular section ex) Introduction - intro notes...
	// Quotes        []Note          `json:"quotes"`         // optional - list of quotes

	// Category    string    `json:"category"`     // optional - some sort of category given by user, default to ""
	LastUpdated time.Time `json:"last_updated"` // last time something was changed or moved
}

// BookReview holds final thoughts and a rating for a LibraryBook
type BookReview struct {
	Review string `json:"review"`
	Rating int8   `json:"rating"`
}

// Lesson represents a lesson/principle you can write about a book - like marginal utility
type Lesson struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Reference   string `json:"reference"`
	Highlight   bool   `json:"highlight"`
}

// SectionNote represents a note you can write about a chapter or section of a book - Chapter 1 or Introduction
type SectionNote struct {
	SectionTitle string `json:"section_title"`
	Notes        string `json:"notes"`
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
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}

// AddLesson appends lesson to book in 'Reading' list
func AddLesson(userID uint64, bookID string, title string, description string, reference string, highlight bool) error {

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

	lesson := Lesson{
		Title:       title,
		Description: description,
		Reference:   reference,
		Highlight:   highlight,
	}

	_, err = db.MutateIn(key, 0, 0).ArrayAppend(fmt.Sprintf("library.read_list[%v].lessons", i), lesson, false).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}

// DeleteLesson deletes lesson from book in 'Reading' list
func DeleteLesson(userID uint64, bookID string, lessonIndex int16) error {

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

	newLessonList, err := removeLessonFromList(readingList[i].LessonsLearned, lessonIndex)

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].lessons", i), newLessonList).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}

// EditLesson edits lesson from book in 'Reading' list
func EditLesson(userID uint64, bookID string, lessonIndex int16, title string, description string, reference string, highlight bool) error {

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

	lessonList := readingList[i].LessonsLearned
	lesson := Lesson{
		Title:       title,
		Description: description,
		Reference:   reference,
		Highlight:   highlight,
	}
	lessonList[lessonIndex] = lesson

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].lessons", i), lessonList).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}

func removeLessonFromList(lessonList []Lesson, i int16) ([]Lesson, error) {
	return append(lessonList[:i], lessonList[i+1:]...), nil
}

// AddSectionNote appends Section Note to book in 'Reading' list
func AddSectionNote(userID uint64, bookID string, title string, notes string) error {

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

	sectionNote := SectionNote{
		SectionTitle: title,
		Notes:        notes,
	}

	_, err = db.MutateIn(key, 0, 0).ArrayAppend(fmt.Sprintf("library.read_list[%v].section_notes", i), sectionNote, false).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}

// DeleteSectionNote deletes Section Note from book in 'Reading' list
func DeleteSectionNote(userID uint64, bookID string, sectionIndex int16) error {

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

	newSectionNotesList, err := removeSectionNoteFromList(readingList[i].SectionNotes, sectionIndex)

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].section_notes", i), newSectionNotesList).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}

func removeSectionNoteFromList(sectionNoteList []SectionNote, i int16) ([]SectionNote, error) {
	return append(sectionNoteList[:i], sectionNoteList[i+1:]...), nil
}

// EditSectionNote edits a Section Note from book in 'Reading' list
func EditSectionNote(userID uint64, bookID string, sectionIndex int16, title string, notes string) error {

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

	newSectionNotesList := readingList[i].SectionNotes
	sectionNote := SectionNote{
		SectionTitle: title,
		Notes:        notes,
	}
	newSectionNotesList[sectionIndex] = sectionNote

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].section_notes", i), newSectionNotesList).Execute()
	if err != nil {
		return fmt.Errorf(err.Error())
	}

	_, err = db.MutateIn(key, 0, 0).Replace(fmt.Sprintf("library.read_list[%v].last_updated", i), time.Now()).Execute()
	if err != nil {
		fmt.Println("error updating timestamp for", key)
	}

	return nil
}
