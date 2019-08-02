package controller

import "projects/bookcase/api/util/session"

var (
	appController         app
	booksController       books
	userController        user
	libraryController     library
	surpriseController    surprise
	libraryBookController librarybook
	sessionManager        *session.Manager
)

// Startup sets up all of the controllers, session managers, route handlers and static files for the application
func Startup(globalSessionManager *session.Manager) {
	appController.registerRoutes()
	booksController.registerRoutes()
	userController.registerRoutes()
	libraryController.registerRoutes()
	libraryBookController.registerRoutes()
	surpriseController.registerRoutes()

	sessionManager = globalSessionManager
}
