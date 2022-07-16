package controllers

import (
	"vicariously/services"

	"github.com/gofiber/fiber/v2"
)

// SetupRoutes setup router api
func SetupRoutes(app *fiber.App) {

	// Basic
	api := app.Group("/api")
	api.Get("/", services.Hello)

	// Auth
	AuthRoutes(app, api)

	// Posts
	PostsRoutes(app, api)

	// Maps
	MapRoutes(app, api)
	
	// serve Single Page application on "/"
	app.Static("/", "frontend/build")
	
	app.Get("/*", func(ctx *fiber.Ctx) error {
		return ctx.SendFile("./frontend/build/index.html")
	})

	// 404 for all other api routes
	FourOhFourRoutes(app, api)

}
