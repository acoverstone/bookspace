package controller

import (
	"encoding/json"
	"net/http"
	"projects/bookcase/api/model"
)

type surprise struct{}

func (s surprise) registerRoutes() {
	http.HandleFunc("/api/surprise/recommended", s.handleRecommended)
	http.HandleFunc("/api/surprise/popular", s.handlePopular)
}

// Returns a list of recommended titles
func (s surprise) handleRecommended(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {

		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.RecommendedSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular titles
func (s surprise) handlePopular(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {

		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.PopularSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}
