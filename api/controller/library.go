package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"projects/bookspace/api/model"
)

type library struct{}

func (l library) registerRoutes() {
	http.HandleFunc("/api/library/add-to-read", l.handleAddToRead)
	http.HandleFunc("/api/library/remove-to-read", l.handleRemoveToRead)
	http.HandleFunc("/api/library/add-read-already", l.handleAddReadAlready)
	http.HandleFunc("/api/library/remove-read-already", l.handleRemoveRead)
	http.HandleFunc("/api/library/add-reading-now", l.handleAddReadingNow)
	http.HandleFunc("/api/library/remove-reading-now", l.handleRemoveRead)
}

// Add book to To-Read list
func (l library) handleAddToRead(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		var data struct {
			UserID uint64 `json:"user_id"`
			BookID string `json:"book_id"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.AddBookToReadList(data.UserID, data.BookID)
		if err != nil {
			fmt.Printf("Error writing to-read to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Remove book from To-Read list
func (l library) handleRemoveToRead(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		var data struct {
			UserID uint64 `json:"user_id"`
			BookID string `json:"book_id"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.RemoveBookFromToReadList(data.UserID, data.BookID)
		if err != nil {
			fmt.Printf("Error deleting from to-read to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Add book to Read Already list
func (l library) handleAddReadAlready(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID uint64 `json:"user_id"`
			BookID string `json:"book_id"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		libraryBook, err := model.AddBookReadList(data.UserID, data.BookID, false)
		if err != nil {
			fmt.Printf("Error writing to-read to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(libraryBook)
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Remove book from Read Already list
func (l library) handleRemoveRead(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		dec := json.NewDecoder(r.Body)
		var data struct {
			UserID uint64 `json:"user_id"`
			BookID string `json:"book_id"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = model.RemoveBookFromReadList(data.UserID, data.BookID)
		if err != nil {
			fmt.Printf("Error deleting from to-read to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Add book to Reading list
func (l library) handleAddReadingNow(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
		enc := json.NewEncoder(w)
		var data struct {
			UserID uint64 `json:"user_id"`
			BookID string `json:"book_id"`
		}
		err := dec.Decode(&data)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		libraryBook, err := model.AddBookReadList(data.UserID, data.BookID, true)
		if err != nil {
			fmt.Printf("Error writing reading-now to DB: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(libraryBook)
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}
