package controllers

import (
	"vicariously/services"
	"vicariously/middleware"

	"github.com/gofiber/fiber/v2"
)


func MapRoutes(app *fiber.App, api fiber.Router) {
	mapbox := api.Group("/mapbox")
	mapbox.Use("*", middleware.Protected)
	mapbox.Get("/", services.MapKey)
	mapbox.Get("/location", services.MapBox)

	// return 404 for all other mapbox routes
	mapbox.Get("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	mapbox.Post("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	mapbox.Put("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	mapbox.Patch("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	mapbox.Delete("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});
}