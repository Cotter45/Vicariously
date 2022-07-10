package controllers 

import "github.com/gofiber/fiber/v2"

func FourOhFourRoutes(app *fiber.App, api fiber.Router) {
	// return 404 for all other api routes
	api.Get("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	api.Post("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	api.Put("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	api.Patch("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});

	api.Delete("/*", func(c *fiber.Ctx) error {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found", "data": nil})
	});
}