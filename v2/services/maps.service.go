package services

import (
	"net/http"
	"io/ioutil"
	"vicariously/config"

	"github.com/gofiber/fiber/v2"
)

func MapKey(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"status": "success", "message": "Mapbox key", "data": config.Config("MAPBOX_TOKEN")})
}

func MapBox(c *fiber.Ctx) error {
	token := config.Config("MAPBOX_TOKEN")

	address := c.Query("address")	
	url := "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + token

	resp, err := http.Get(url)
	if err != nil {
		return c.JSON(fiber.Map{"status": "error", "message": "Error getting mapbox data", "data": err})
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return c.JSON(fiber.Map{"status": "error", "message": "Error reading mapbox data", "data": err})
	}

	return c.Send(body)
}