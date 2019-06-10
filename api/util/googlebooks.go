package util

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"time"
)

type googlebooks interface {
	SearchBooks() ([]byte, error)
	GetBook() ([]byte, error)
}

var client = http.Client{
	Timeout: time.Duration(3 * time.Second),
}

// SearchBooks returns a list of books from Google Books API for a given querystring.
// https://developers.google.com/apis-explorer/?hl=en_US#p/books/v1/books.volumes.list
// QueryParams: maxResults=15, orderBy=relevance, printType=books, showPreorders=true
func SearchBooks(query string) ([]byte, error) {
	response, err := client.Get(fmt.Sprintf("https://www.googleapis.com/books/v1/volumes?q=%v&maxResults=15&orderBy=relevance&printType=books&showPreorders=true&key=%v", url.QueryEscape(query), os.Getenv("GOOGLE_BOOKS_API_KEY")))
	if err != nil {
		return nil, fmt.Errorf("error contacting Google Books API: %v", err)
	}

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("error parsing response from Google Books API: %v", err)
	}

	return data, nil
}

// GetBook returns a book from Google Books API for given ID.
func GetBook(id string) ([]byte, error) {
	response, err := client.Get(fmt.Sprintf("https://www.googleapis.com/books/v1/volumes/%v?=%v", url.QueryEscape(id), os.Getenv("GOOGLE_BOOKS_API_KEY")))
	if err != nil {
		return nil, fmt.Errorf("error contacting Google Books API: %v", err)
	}

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("error parsing response from Google Books API: %v", err)
	}

	return data, nil
}
