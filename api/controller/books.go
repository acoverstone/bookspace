package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"projects/bookcase/api/model"
	"projects/bookcase/api/util"
	"regexp"
	"strings"

	strip "github.com/grokify/html-strip-tags-go"
)

type books struct{}

func (b books) registerRoutes() {
	http.HandleFunc("/api/authors", b.handleSearchBooksByAuthor)
	http.HandleFunc("/api/books", b.handleSearchBooks)
	http.HandleFunc("/api/books/", b.handleGetBook)
}

// GET: Search books with a query parameter /api/books?q=[querystring]
func (b books) handleSearchBooks(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Grabs querystring from: /api/books?q=[querystring], returns 400 if not exists
		keys, ok := r.URL.Query()["q"]
		enc := json.NewEncoder(w)
		fmt.Println(keys)
		if !ok || len(keys) < 1 {
			fmt.Printf("Error parsing querystring\n")
			w.WriteHeader(http.StatusBadRequest)
			enc.Encode([]string{})
			return
		}
		query := keys[0]

		// Performs Google Books search
		fmt.Println("Searching for books with query:", query)
		booksJSONstring, err := util.SearchBooks(query)
		if err != nil {
			fmt.Printf("Error connecting to API or parsing response: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			enc.Encode([]string{})
			return
		}

		// Builds response object from Google Books response - empty array if there is an err
		res, err := booksJSONToBookList(booksJSONstring)
		if err != nil {
			fmt.Printf("Error parsing Google Books response: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			enc.Encode([]string{})
			return
		}

		// Finally returns successfully if all checks pass
		w.WriteHeader(http.StatusOK)
		enc.Encode(res)
		return
	}
	// Return 404 if not GET
	w.WriteHeader(http.StatusMethodNotAllowed)
	return
}

// GET: Search books by author with a query parameter /api/books?q=[querystring]
func (b books) handleSearchBooksByAuthor(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Grabs querystring from: /api/authors?q=[querystring], returns 400 if not exists
		keys, ok := r.URL.Query()["q"]
		enc := json.NewEncoder(w)
		fmt.Println(keys)
		if !ok || len(keys) < 1 {
			fmt.Printf("Error parsing querystring\n")
			w.WriteHeader(http.StatusBadRequest)
			enc.Encode([]string{})
			return
		}
		query := keys[0]

		// Performs Google Books search
		fmt.Println("Searching for books by author with query:", query)
		booksJSONstring, err := util.SearchBooksByAuthor(query)
		if err != nil {
			fmt.Printf("Error connecting to API or parsing response: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			enc.Encode([]string{})
			return
		}

		// Builds response object from Google Books response - empty array if there is an err
		res, err := booksJSONToBookList(booksJSONstring)
		if err != nil {
			fmt.Printf("Error parsing Google Books response: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			enc.Encode([]string{})
			return
		}

		// Finally returns successfully if all checks pass
		w.WriteHeader(http.StatusOK)
		enc.Encode(res)
		return
	}
	// Return 404 if not GET
	w.WriteHeader(http.StatusMethodNotAllowed)
	return
}

// GET: Get an individual book by ID - /api/books/[id]
func (b books) handleGetBook(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		// Grabs id from: /api/books/[id], returns 400 if not exists
		categoryPattern, _ := regexp.Compile(`/books/(\w+)`)
		matches := categoryPattern.FindStringSubmatch(r.URL.Path)
		enc := json.NewEncoder(w)
		if len(matches) < 2 {
			fmt.Printf("Error parsing querystring\n")
			w.WriteHeader(http.StatusBadRequest)
			enc.Encode(map[string]interface{}{})
			return
		}

		fmt.Println("Searching for book: ", matches[1])
		bookJSONstring, err := util.GetBook(matches[1])
		if err != nil {
			fmt.Printf("Error connecting to API or parsing response: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			enc.Encode(map[string]interface{}{})
			return
		}

		bookMap := map[string]interface{}{}
		err = json.Unmarshal(bookJSONstring, &bookMap)
		if err != nil {
			fmt.Printf("Error parsing response: %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			enc.Encode(map[string]interface{}{})
			return
		}

		res, err := bookJSONToBook(bookMap)
		if err != nil {
			fmt.Printf("No valid book response for '%v': %v\n", matches[1], err)
			w.WriteHeader(http.StatusNotFound)
			enc.Encode(map[string]interface{}{})
			return
		}

		w.WriteHeader(http.StatusOK)
		enc.Encode(res)
		return
	}
	// Return 404 if not GET
	w.WriteHeader(http.StatusMethodNotAllowed)
	return
}

// Parse response from Google API to []model.Book
func booksJSONToBookList(booksJSONstring []byte) ([]model.Book, error) {
	bookList := []model.Book{}

	var googleBookResponse struct {
		Kind       string                   `json:"kind"`
		TotalItems int                      `json:"totalItems"`
		Items      []map[string]interface{} `json:"items"`
	}

	err := json.Unmarshal(booksJSONstring, &googleBookResponse)
	if err != nil {
		fmt.Printf("error parsing Google Books response to object: %v\n", err)
		return []model.Book{}, fmt.Errorf("error parsing Google Books response to object: %v", err)
	}

	for _, item := range googleBookResponse.Items {
		book, err := bookJSONToBook(item)
		if err == nil && !isBookInBookList(book, bookList) && book.Image != "" && len(book.Authors) > 0 && !strings.Contains(book.BookID, "-") {
			bookList = append(bookList, book)
		}
	}

	return bookList, nil
}

// Returns true if the same ID or Title/Description combo is present
func isBookInBookList(book model.Book, bookList []model.Book) bool {
	for _, checkBook := range bookList {
		if book.BookID == checkBook.BookID || (book.Title == checkBook.Title && book.Description == book.Description) {
			return true
		}
	}
	return false
}

// Parse Google API Volume unmarshalled json to Book Struct (necessary fields for this app)
func bookJSONToBook(item map[string]interface{}) (model.Book, error) {
	book := model.Book{}
	if id, ok := item["id"].(string); ok {
		book.BookID = id
	}

	if volumeInfo, ok := item["volumeInfo"].(map[string]interface{}); ok {
		if title, ok := volumeInfo["title"].(string); ok {
			book.Title = title
		}
		if subtitle, ok := volumeInfo["subtitle"].(string); ok {
			book.Subtitle = subtitle
		}
		if authors, ok := volumeInfo["authors"].([]interface{}); ok {
			authorList := []string{}
			for _, author := range authors {
				authorList = append(authorList, author.(string))
			}
			book.Authors = authorList
		}
		if publishDate, ok := volumeInfo["publishDate"].(string); ok {
			book.PublishedDate = publishDate
		}
		if description, ok := volumeInfo["description"].(string); ok {
			book.Description = strip.StripTags(description)
			book.Description = book.GetSummary()
		}
		if categories, ok := volumeInfo["categories"].([]interface{}); ok {
			categoryList := []string{}
			for _, category := range categories {
				categoryList = append(categoryList, category.(string))
			}
			book.Categories = categoryList
		}
		if pageCount, ok := volumeInfo["pageCount"].(float64); ok {
			book.PageCount = pageCount
		}
		if averageRating, ok := volumeInfo["averageRating"].(float64); ok {
			book.Rating = averageRating
		}
		if imageLinks, ok := volumeInfo["imageLinks"].(map[string]interface{}); ok {
			if image, ok := imageLinks["thumbnail"].(string); ok {
				book.Image = image
			}
		}
		if language, ok := volumeInfo["language"].(string); ok {
			book.Language = language
		}
	}

	if book.Title != "" && book.BookID != "" {
		return book, nil
	}

	return model.Book{}, fmt.Errorf("this book doesn't have necessary fields")
}
