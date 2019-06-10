package session

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

// Store contains all data for one session process with specific id.
type Store interface {
	Set(key, value interface{}) error
	Get(key interface{}) interface{}
	Delete(key interface{}) error
	SessionID() string
	Flush() error
}

/* ---------------------------------------------------------------------------------------------------------- */

// Provider contains global session methods and saved SessionStores.
// it can operate a SessionStore by its id.
type Provider interface {
	SessionInit(savePath string) error
	SessionRead(sid string) (Store, error)
	SessionDestroy(sid string) error
	SessionGC(maxLifetime int64)
}

var provides = make(map[string]Provider)

// Register makes a session provide available by the provided name.
// If Register is called twice with the same name or if driver is nil,
// it panics.
func Register(name string, provide Provider) {
	if provide == nil {
		panic("session: Register provide is nil")
	}
	if _, dup := provides[name]; dup {
		panic("session: Register called twice for provider " + name)
	}
	provides[name] = provide
}

/* ---------------------------------------------------------------------------------------------------------- */

// Manager contains a Provider and its configuration.
type Manager struct {
	cookieName  string
	provider    Provider
	maxlifetime int64
}

// NewManager creates new Manager with provider name and given parameters
func NewManager(provideName string, cookieName string, maxlifetime int64, savePath string) (*Manager, error) {
	provider, ok := provides[provideName]
	if !ok {
		return nil, fmt.Errorf("session: unkown provider %q (forgot import?)", provideName)
	}

	err := provider.SessionInit(savePath)
	if err != nil {
		return nil, err
	}

	return &Manager{provider: provider, cookieName: cookieName, maxlifetime: maxlifetime}, nil
}

// sessionId generates a unique sessionID
func (manager *Manager) sessionID() string {
	b := make([]byte, 32)
	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		return ""
	}
	return base64.URLEncoding.EncodeToString(b)
}

// SessionStart generates or reads the sessionID from http request.
// if session id exists, return SessionStore with this id.
func (manager *Manager) SessionStart(w http.ResponseWriter, r *http.Request) Store {
	cookie, err := r.Cookie(manager.cookieName)
	if err != nil || cookie.Value == "" {
		sid := manager.sessionID()
		session, _ := manager.provider.SessionRead(sid)
		cookie := http.Cookie{
			Name:     manager.cookieName,
			Value:    url.QueryEscape(sid),
			Path:     "/",
			HttpOnly: true,
			Secure:   manager.isSecure(r),
			MaxAge:   int(manager.maxlifetime),
		}
		http.SetCookie(w, &cookie)
		return session
	} else {
		sid, _ := url.QueryUnescape(cookie.Value)
		session, _ := manager.provider.SessionRead(sid)
		return session
	}
}

// SessionDestroy destroys session by its id in http request cookie.
func (manager *Manager) SessionDestroy(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie(manager.cookieName)
	if err != nil || cookie.Value == "" {
		return
	} else {
		manager.provider.SessionDestroy(cookie.Value)
		expiration := time.Now()
		cookie := http.Cookie{
			Name:     manager.cookieName,
			Path:     "/",
			HttpOnly: true,
			Expires:  expiration,
			MaxAge:   -1,
		}
		http.SetCookie(w, &cookie)
	}
}

// GC Start session gc process - it can do gc in times after gc lifetime.
func (manager *Manager) GC() {
	manager.provider.SessionGC(manager.maxlifetime)
	time.AfterFunc(time.Duration(manager.maxlifetime)*time.Second, func() { manager.GC() })
}

// Set cookie with https.
func (manager *Manager) isSecure(req *http.Request) bool {

	if req.URL.Scheme != "" {
		return req.URL.Scheme == "https"
	}
	if req.TLS == nil {
		return false
	}
	return true
}
