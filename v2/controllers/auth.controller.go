package controllers

import (
	"vicariously/services"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App, api fiber.Router) {
	auth := api.Group("/auth")
	auth.Get("/restore", services.Restore)
	auth.Post("/login", services.Login)
	auth.Post("/signup", services.Signup)
	auth.Delete("/logout", services.Logout)
}