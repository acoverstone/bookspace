package util

import (
	"errors"
	"os"

	"gopkg.in/couchbase/gocb.v1"
)

// GetCouchbaseBucket returns Book-Club Couchbase Bucket
func GetCouchbaseBucket() (*gocb.Bucket, error) {
	cluster, err := gocb.Connect(os.Getenv("BOOKS_CB_CONN"))
	if err != nil {
		return nil, errors.New("error connecting to couchbase")
	}

	cluster.Authenticate(gocb.PasswordAuthenticator{
		Username: os.Getenv("BOOKS_CB_USER"),
		Password: os.Getenv("BOOKS_CB_PASS"),
	})

	bucket, err := cluster.OpenBucket(os.Getenv("BOOKS_CB_BUCKET"), "")

	if err != nil {
		return nil, errors.New("error connecting to couchbase bucket")
	}

	return bucket, nil
}
