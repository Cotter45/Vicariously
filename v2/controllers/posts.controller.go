package controllers

import (
	"vicariously/services"
	// "vicariously/middleware"

	"github.com/gofiber/fiber/v2"
)

func PostsRoutes(app *fiber.App, api fiber.Router) {
	posts := api.Group("/posts")
	// posts.Use("*", middleware.Protected)
	posts.Get("/:id", services.GetPostById)
	posts.Get("/", services.GetPaginatedPosts)
	posts.Post("/", services.CreatePost)
	posts.Patch("/:id", services.UpdatePost)
	posts.Delete("/:id", services.DeletePost)

	// return 404 for all other api routes
	posts.Get("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	posts.Post("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	posts.Put("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	posts.Patch("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	posts.Delete("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});
}