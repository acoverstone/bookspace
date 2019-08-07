package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"projects/bookspace/api/controller"
	"projects/bookspace/api/model"
	"projects/bookspace/api/util"
	"projects/bookspace/api/util/session"

	"github.com/rs/cors"

	"gopkg.in/couchbase/gocb.v1"
)

// Setup db/controller/middleware etc. and get the application running
func main() {

	// Setup database connection (Current implementation - couchbase)
	db := connectToCouchbase()
	defer db.Close()

	// Setup session manager and start grabage collector
	globalSessions, err := session.NewManager("memory", "gosessionid", 7200, os.Getenv("BOOKS_SESSION_PATH"))
	if err != nil {
		panic("error creating session manager: " + err.Error())
	}
	go globalSessions.GC()

	// Setup controllers with sessionManager and cors enabled
	controller.Startup(globalSessions)
	// c := cors.AllowAll()
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("BOOKS_BASE_URL"), os.Getenv("BOOKS_BASE_URL") + ":3000", "https://bookspace.app", "https://www.bookspace.app"},
		AllowCredentials: true,
		AllowedMethods:   []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
	})

	// Add this additonal goroutine to monitor for profiling - comment out as needed
	// Go here with application running: http://167.71.99.96:8080/debug/pprof/
	// go http.ListenAndServe(":8080", nil)

	// Serve application https and with DefaultServeMux
	// Could replace defaultServeMux with middleware (see how to setup in tutorials)
	// Could replace ListenAndServe with ListenAndServeTLS
	// if os.Getenv("BOOKS_ENV") == "prod" {
	// 	http.ListenAndServeTLS(":8000", os.Getenv("BOOKS_CERTS")+"cert.pem", os.Getenv("BOOKS_CERTS")+"key.pem", c.Handler(http.DefaultServeMux))
	// } else {
	http.ListenAndServe(":8000", c.Handler(http.DefaultServeMux))
	// }
}

// Creates a couchbase bucket and sets it in the model - be sure to close this db in the main function
func connectToCouchbase() *gocb.Bucket {
	db, err := util.GetCouchbaseBucket()
	if err != nil {
		log.Fatalln(fmt.Errorf("Unable to connect to database: %v", err))
	}
	model.SetDatabase(db)
	return db
}
