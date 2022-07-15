package controllers

import (
	"vicariously/services"
	"vicariously/middleware"

	"github.com/gofiber/fiber/v2"
)

func PostsRoutes(app *fiber.App, api fiber.Router) {
	posts := api.Group("/posts")
	posts.Use("*", middleware.Protected)
	posts.Get("/:id", services.GetPostById)
	posts.Get("/", services.GetPaginatedPosts)
	posts.Post("/", services.CreatePost)
	posts.Patch("/:id", services.UpdatePost)
	posts.Delete("/:id", services.DeletePost)
}