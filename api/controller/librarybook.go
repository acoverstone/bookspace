package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"projects/bookspace/api/model"
	"time"
)

type librarybook struct{}
type tsResponse struct {
	Timestamp time.Time `json:"timestamp"`
}

func (l librarybook) registerRoutes() {
	http.HandleFunc("/api/library/add-closing-thoughts", l.handleAddClosingThoughts)
	http.HandleFunc("/api/library/add-book-summary", l.handleAddBookSummary)
	http.HandleFunc("/api/library/add-lesson-learned", l.handleAddLesson)
	http.HandleFunc("/api/library/add-section-note", l.handleAddSectionNote)
	http.HandleFunc("/api/library/delete-lesson-learned", l.handleDeleteLesson)
	http.HandleFunc("/api/library/edit-lesson-learned", l.handleEditLesson)
	http.HandleFunc("/api/library/delete-section-note", l.handleDeleteSectionNote)
	http.HandleFunc("/api/library/edit-section-note", l.handleEditSectionNote)
	http.HandleFunc("/api/library/set-reading-now", l.handleSetReadingNow)
}

// Add/Edit Closing Thoughts to book
func (l librarybook) handleAddClosingThoughts(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID uint64 `json:"user_id"`
			BookID string `json:"book_id"`
			Review string `json:"review"`
			Rating int8   `json:"rating"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.AddClosingThoughts(data.UserID, data.BookID, data.Review, data.Rating)
		if err != nil {
			fmt.Printf("Error writing closing thought to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Add/Edit Book Summary for a given book
func (l librarybook) handleAddBookSummary(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID  uint64 `json:"user_id"`
			BookID  string `json:"book_id"`
			Summary string `json:"summary"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.AddBookSummary(data.UserID, data.BookID, data.Summary)
		if err != nil {
			fmt.Printf("Error writing book summary to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Add a Lesson Learned for a given book
func (l librarybook) handleAddLesson(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID      uint64 `json:"user_id"`
			BookID      string `json:"book_id"`
			Title       string `json:"title"`
			Description string `json:"description"`
			Reference   string `json:"reference"`
			Highlight   bool   `json:"highlight"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.AddLesson(data.UserID, data.BookID, data.Title, data.Description, data.Reference, data.Highlight)
		if err != nil {
			fmt.Printf("Error writing Lesson to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Delete a Lesson Learned for a given book
func (l librarybook) handleDeleteLesson(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID      uint64 `json:"user_id"`
			BookID      string `json:"book_id"`
			LessonIndex int16  `json:"index"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.DeleteLesson(data.UserID, data.BookID, data.LessonIndex)
		if err != nil {
			fmt.Printf("Error deleting Lesson from DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Edit a Lesson Learned for a given book
func (l librarybook) handleEditLesson(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID      uint64 `json:"user_id"`
			BookID      string `json:"book_id"`
			LessonIndex int16  `json:"index"`
			Title       string `json:"title"`
			Description string `json:"description"`
			Reference   string `json:"reference"`
			Highlight   bool   `json:"highlight"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.EditLesson(data.UserID, data.BookID, data.LessonIndex, data.Title, data.Description, data.Reference, data.Highlight)
		if err != nil {
			fmt.Printf("Error editing Lesson from DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Add a Lesson Learned for a given book
func (l librarybook) handleAddSectionNote(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID       uint64 `json:"user_id"`
			BookID       string `json:"book_id"`
			SectionTitle string `json:"section_title"`
			Notes        string `json:"notes"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.AddSectionNote(data.UserID, data.BookID, data.SectionTitle, data.Notes)
		if err != nil {
			fmt.Printf("Error writing Section Note to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Delete a Section Note Learned for a given book
func (l librarybook) handleDeleteSectionNote(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID       uint64 `json:"user_id"`
			BookID       string `json:"book_id"`
			SectionIndex int16  `json:"index"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.DeleteSectionNote(data.UserID, data.BookID, data.SectionIndex)
		if err != nil {
			fmt.Printf("Error deleting Section Note from DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Edit a Section Note for a given book
func (l librarybook) handleEditSectionNote(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID       uint64 `json:"user_id"`
			BookID       string `json:"book_id"`
			SectionIndex int16  `json:"index"`
			SectionTitle string `json:"section_title"`
			Notes        string `json:"notes"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.EditSectionNote(data.UserID, data.BookID, data.SectionIndex, data.SectionTitle, data.Notes)
		if err != nil {
			fmt.Printf("Error editing Section Note from DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Set a book as reading now or read already
// Assumes this exists in the reading list
func (l librarybook) handleSetReadingNow(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID     uint64 `json:"user_id"`
			BookID     string `json:"book_id"`
			ReadingNow bool   `json:"reading_now"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.SetReadingNow(data.UserID, data.BookID, data.ReadingNow)
		if err != nil {
			fmt.Printf("Error setting reading_now variable for book in DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(tsResponse{Timestamp: time.Now()})
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}
