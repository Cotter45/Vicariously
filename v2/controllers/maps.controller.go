package controllers

import (
	"vicariously/services"

	"github.com/gofiber/fiber/v2"
)


func MapRoutes(app *fiber.App, api fiber.Router) {
	mapbox := api.Group("/mapbox")
	mapbox.Get("/", services.MapKey)
	mapbox.Get("/location", services.MapBox)
}