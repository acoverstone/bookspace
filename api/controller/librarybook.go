package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"projects/bookcase/api/model"
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
	http.HandleFunc("/api/library/delete-lesson-learned", l.handleDeleteLesson)
	http.HandleFunc("/api/library/edit-lesson-learned", l.handleEditLesson)
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

// Delete a Lesson Learned for a given book
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
