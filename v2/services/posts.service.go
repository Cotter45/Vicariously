package services

import (
	"vicariously/config"
	"vicariously/models"

	"fmt"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm/clause"
)

// GetPostById returns a post by id
// with all associations
func GetPostById(c *fiber.Ctx) error {
	id := c.Params("id")
	fmt.Println(id)
	db := config.DB
	var post models.Post
	db.Preload(clause.Associations).First(&post, id)
	if post.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No post found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Post found", "data": post})
}

// CreatePost creates a new post
func CreatePost(c *fiber.Ctx) error {
	db := config.DB
	post := new(models.Post)
	if err := c.BodyParser(post); err != nil {
		c.Status(500).JSON(fiber.Map{"status": "error", "message": err.Error(), "data": nil})
	}

	err := db.Create(&post)
	if err.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": err.Error.Error(), "data": nil})
	}

	var newPost models.Post
	db.Preload(clause.Associations).First(&newPost, post.ID)

	return c.JSON(fiber.Map{"status": "success", "message": "Post created", "data": newPost})
}