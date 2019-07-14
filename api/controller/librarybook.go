package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"projects/bookcase/api/model"
)

type librarybook struct{}

func (l librarybook) registerRoutes() {
	http.HandleFunc("/api/library/add-closing-thoughts", l.handleAddClosingThoughts)
	http.HandleFunc("/api/library/remove-closing-thoughts", l.handleRemoveClosingThoughts)

}

// Add closing thought to book
func (l librarybook) handleAddClosingThoughts(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		dec := json.NewDecoder(r.Body)
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
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Remove closing thought from book
func (l librarybook) handleRemoveClosingThoughts(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		// For a POST request - check UserID and BookID, return success or failure header
		// dec := json.NewDecoder(r.Body)
		// var data struct {
		// 	UserID uint64 `json:"user_id"`
		// 	BookID string `json:"book_id"`
		// }
		// err := dec.Decode(&data)
		// if err != nil {
		// 	w.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

		// err = model.AddBookToReadList(data.UserID, data.BookID)
		// if err != nil {
		// 	fmt.Printf("Error writing to-read to DB: %v\n", err)
		// 	w.WriteHeader(http.StatusInternalServerError)
		// 	return
		// }

		w.WriteHeader(http.StatusOK)
		return

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}