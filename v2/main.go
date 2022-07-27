package main

import (
	"fmt"
	"log"
	"os"
	"time"

	// "sync"
	"vicariously/config"
	"vicariously/controllers"
	"vicariously/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/csrf"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/utils"
	"github.com/gofiber/helmet/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"

)


func main() {

	// wg := new(sync.WaitGroup)
	// wg.Add(2)

	// go func() {
		// defer wg.Done()
		app := fiber.New()
	
		if config.Config("ENVIRONMENT") == "development" {
			app.Use(cors.New())
			app.Use(logger.New())
		}
		app.Use(recover.New())
		app.Use(helmet.New())
		app.Use(compress.New())
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
		// Initialize default config
		app.Use(csrf.New())

		// Or extend your config for customization
		app.Use(csrf.New(csrf.Config{
				KeyLookup:      "header:X-Csrf-Token",
				CookieName:     "csrf_",
				CookieSameSite: "Strict",
				Expiration:     1 * time.Hour,
				KeyGenerator:   utils.UUIDv4,
		}))

		app.Get("/metrics", middleware.Protected, monitor.New(monitor.Config{Title: "MyService Metrics Page"}))

		config.ConnectDB()
		controllers.SetupRoutes(app)

		port := os.Getenv("PORT")
		if port == "" {
			port = "8000"
		}

		log.Fatal(app.Listen(fmt.Sprint(":", port)))
	// }()

	// go func() {
	// 	defer wg.Done()
	// 	app := fiber.New()
		
	// 	app.Use(cors.New())

	// 	app.Get("/", func(c *fiber.Ctx) error {
	// 		return c.SendString("Hello, World!")
	// 	})

	// 	log.Fatal(app.Listen(fmt.Sprint(":", "8001")))
	// }()

	// wg.Wait()
}