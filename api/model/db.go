package model

import "gopkg.in/couchbase/gocb.v1"

var db *gocb.Bucket

// SetDatabase creates db variable for access by model
func SetDatabase(database *gocb.Bucket) {
	db = database
}
