package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"time"
)

// TimeoutMiddleware returns timeout if request takes longer than given time
type TimeoutMiddleware struct {
	Next    http.Handler
	Timeout int
}

func (tm TimeoutMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if tm.Next == nil {
		tm.Next = http.DefaultServeMux
	}

	ctx := r.Context()
	ctx, cancel := context.WithTimeout(ctx, time.Duration(tm.Timeout)*time.Second)
	r.WithContext(ctx)
	defer cancel()

	ch := make(chan struct{})
	go func() {
		tm.Next.ServeHTTP(w, r)
		ch <- struct{}{}
	}()

	select {
	// return normally
	case <-ch:
		return
	//ctx timed out
	case <-ctx.Done():
		w.WriteHeader(http.StatusRequestTimeout)
		enc := json.NewEncoder(w)
		enc.Encode([]string{})
		return
	}
}
