package controller

import (
	"encoding/json"
	"net/http"
	"projects/bookspace/api/model"
)

type surprise struct{}

func (s surprise) registerRoutes() {
	http.HandleFunc("/api/surprise/recommended", s.handleRecommended)
	http.HandleFunc("/api/surprise/popular", s.handlePopular)
	http.HandleFunc("/api/surprise/fiction", s.handleFiction)
	http.HandleFunc("/api/surprise/science", s.handleScience)
	http.HandleFunc("/api/surprise/biography", s.handleBiography)
	http.HandleFunc("/api/surprise/nonfiction", s.handleNonfiction)
	http.HandleFunc("/api/surprise/sci-fi", s.handleScifi)
	http.HandleFunc("/api/surprise/classic", s.handleClassic)
	http.HandleFunc("/api/surprise/self-improvement", s.handleSelfImprovement)
	http.HandleFunc("/api/surprise/finance", s.handleFinance)
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

// Returns a list of most popular titles
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

// Returns a list of popular fiction titles
func (s surprise) handleFiction(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.FictionSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular science titles
func (s surprise) handleScience(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.ScienceSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular biography titles
func (s surprise) handleBiography(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.BiographySurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular nonfiction titles
func (s surprise) handleNonfiction(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.NonfictionSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular science fiction titles
func (s surprise) handleScifi(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.ScifiSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular classic titles
func (s surprise) handleClassic(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.ClassicSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular self improvemtn titles
func (s surprise) handleSelfImprovement(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.SelfImprovementSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}

// Returns a list of popular finance titles
func (s surprise) handleFinance(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		enc := json.NewEncoder(w)
		w.WriteHeader(http.StatusOK)
		enc.Encode(model.FinanceSurprise)
		return
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
}
