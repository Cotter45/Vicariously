package services

import (
	"strconv"
	"vicariously/config"
	"vicariously/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm/clause"
)

// GetPostById returns a post by id
func GetPostById(c *fiber.Ctx) error {
	id := c.Params("id")
	db := config.DB
	var post models.Post
	db.Preload(clause.Associations).First(&post, id)
	if post.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No post found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Post found", "data": post})
}

// GetPaginatedPosts returns a paginated list of posts
func GetPaginatedPosts(c *fiber.Ctx) error {
	db := config.DB
	var posts []models.Post

	skip := c.Query("skip")
	if skip == "" {
		skip = "0"
	}

	take := c.Query("take")
	if take == "" {
		take = "10"
	}

	skipInt, _ := strconv.Atoi(skip)
	takeInt, _ := strconv.Atoi(take)

	db.Preload(clause.Associations).Limit(takeInt).Offset(skipInt).Find(&posts)

	return c.JSON(fiber.Map{"status": "success", "message": "Posts found", "data": posts})
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

// UpdatePost updates a post
func UpdatePost(c *fiber.Ctx) error {
	db := config.DB
	id := c.Params("id")

	var post models.Post
	db.First(&post, id)
	if post.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No post found with ID", "data": nil})
	}

	if err := c.BodyParser(&post); err != nil {
		c.Status(500).JSON(fiber.Map{"status": "error", "message": err.Error(), "data": nil})
	}

	err := db.Save(&post)
	if err.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": err.Error.Error(), "data": nil})
	}

	var newPost models.Post
	db.Preload(clause.Associations).First(&newPost, post.ID)

	return c.JSON(fiber.Map{"status": "success", "message": "Post updated", "data": newPost})
}

// DeletePost deletes a post
func DeletePost(c *fiber.Ctx) error {
	db := config.DB
	id := c.Params("id")

	var post models.Post
	db.First(&post, id)
	if post.Title == "" {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No post found with ID", "data": nil})
	}

	err := db.Delete(&post)
	if err.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": err.Error.Error(), "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Post deleted", "data": nil})
}