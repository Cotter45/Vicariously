package main

import (
	"log"
	"os"
	"fmt"
	"vicariously/controllers"
	"vicariously/config"
	"vicariously/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/helmet/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
)


func main() {
	app := fiber.New()

	if config.Config("ENVIRONMENT") == "development" {
		app.Use(cors.New())
		app.Use(logger.New())
	}
	app.Use(recover.New())
	app.Use(helmet.New())
	app.Use(func(c *fiber.Ctx) error {
		// Set some security headers:
		c.Set("X-XSS-Protection", "1; mode=block")
		c.Set("X-Content-Type-Options", "nosniff")
		c.Set("X-Download-Options", "noopen")
		c.Set("Strict-Transport-Security", "max-age=5184000")
		c.Set("X-Frame-Options", "SAMEORIGIN")
		c.Set("X-DNS-Prefetch-Control", "off")

		// Go to next middleware:
		return c.Next()
	})

	app.Get("/metrics", middleware.Protected, monitor.New(monitor.Config{Title: "MyService Metrics Page"}))

	config.ConnectDB()
	controllers.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Fatal(app.Listen(fmt.Sprint(":", port)))
}