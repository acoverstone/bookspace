package session

import (
	"container/list"
	"fmt"
	"sync"
	"time"
)

var memProvider = &MemProvider{list: list.New(), sessions: make(map[string]*list.Element)}

// MemSessionStore saves sessions in a map in memory.
type MemSessionStore struct {
	sessionID    string
	timeAccessed time.Time
	value        map[interface{}]interface{}
	lock         sync.RWMutex
}

// Set value to memory session
func (ss *MemSessionStore) Set(key, value interface{}) error {
	ss.lock.Lock()
	defer ss.lock.Unlock()
	ss.value[key] = value
	memProvider.SessionUpdate(ss.sessionID)
	return nil
}

// Get value from memory session by key
func (ss *MemSessionStore) Get(key interface{}) interface{} {
	ss.lock.RLock()
	defer ss.lock.RUnlock()
	memProvider.SessionUpdate(ss.sessionID)
	if v, ok := ss.value[key]; ok {
		return v
	}
	return nil
}

// Delete in memory session by key
func (ss *MemSessionStore) Delete(key interface{}) error {
	ss.lock.Lock()
	defer ss.lock.Unlock()
	delete(ss.value, key)
	return nil
}

// SessionID returns id of memory session store
func (ss *MemSessionStore) SessionID() string {
	return ss.sessionID
}

// Flush clear all values in memory session
func (ss *MemSessionStore) Flush() error {
	ss.lock.Lock()
	defer ss.lock.Unlock()
	ss.value = make(map[interface{}]interface{})
	return nil
}

// MemProvider implements the provider interface.
type MemProvider struct {
	lock     sync.RWMutex
	sessions map[string]*list.Element
	list     *list.List
	savePath string
}

// SessionInit inits a memory session
func (pder *MemProvider) SessionInit(savePath string) error {
	pder.savePath = savePath
	return nil
}

// SessionRead gets memory session store by sessionID.
func (pder *MemProvider) SessionRead(sid string) (Store, error) {
	// If session is found, return it
	pder.lock.RLock()
	if element, ok := pder.sessions[sid]; ok {
		go pder.SessionUpdate(sid)
		pder.lock.RUnlock()
		return element.Value.(*MemSessionStore), nil
	}
	// Otherwise create a new one
	pder.lock.RUnlock()
	pder.lock.Lock()
	newsest := &MemSessionStore{sessionID: sid, timeAccessed: time.Now(), value: make(map[interface{}]interface{})}
	element := pder.list.PushFront(newsest)
	pder.sessions[sid] = element
	pder.lock.Unlock()
	return newsest, nil
}

// SessionUpdate expands time of session store by id in memory session.
func (pder *MemProvider) SessionUpdate(sid string) error {
	pder.lock.Lock()
	defer pder.lock.Unlock()
	if element, ok := pder.sessions[sid]; ok {
		element.Value.(*MemSessionStore).timeAccessed = time.Now()
		pder.list.MoveToFront(element)
		return nil
	}
	return nil
}

// SessionExists checks if the session store exist in memory session by sessionID.
func (pder *MemProvider) SessionExists(sid string) bool {
	pder.lock.RLock()
	defer pder.lock.RUnlock()
	if _, ok := pder.sessions[sid]; ok {
		return true
	}
	return false
}

// SessionDestroy delete session store in memory session by id
func (pder *MemProvider) SessionDestroy(sid string) error {
	pder.lock.Lock()
	defer pder.lock.Unlock()
	if element, ok := pder.sessions[sid]; ok {
		delete(pder.sessions, sid)
		pder.list.Remove(element)
		return nil
	}
	return nil
}

// SessionGC clean expired session stores in memory session
func (pder *MemProvider) SessionGC(maxLifetime int64) {
	pder.lock.RLock()
	for {
		element := pder.list.Back()
		if element == nil {
			break
		}
		if (element.Value.(*MemSessionStore).timeAccessed.Unix() + maxLifetime) < time.Now().Unix() {
			pder.lock.RUnlock()
			pder.lock.Lock()
			pder.list.Remove(element)
			delete(pder.sessions, element.Value.(*MemSessionStore).sessionID)
			pder.lock.Unlock()
			pder.lock.RLock()
		} else {
			break
		}
	}
	fmt.Printf("GC running: %v sessions present.\n", pder.Size())
	pder.lock.RUnlock()
}

// Size reutnrs number of memory sessions
func (pder *MemProvider) Size() int {
	return pder.list.Len()
}

func init() {
	Register("memory", memProvider)
}
