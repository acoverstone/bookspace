package controller

import (
	"net/http"
)

type app struct{}

// Register build/static directory of UI and serve to "/"
func (a app) registerRoutes() {
	staticHandler := http.StripPrefix("/static", http.FileServer(http.Dir("/Users/acovers/go/src/projects/bookcase/ui/build/static")))
	http.Handle("/static/", staticHandler)

	// Serve react application from build directory at root
	http.Handle("/", http.FileServer(http.Dir("/Users/acovers/go/src/projects/bookcase/ui/build")))
}
