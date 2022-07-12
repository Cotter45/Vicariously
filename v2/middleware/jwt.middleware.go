package middleware

import (
	"vicariously/config"
	"vicariously/services"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte(config.Config("SECRET"))

type Claims struct {
	Email string `json:"email"`
	UserID uint `json:"id"`
	jwt.StandardClaims
}

type SafeUser struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	ProfilePicture string `json:"profile_picture"`
	CoverPicture string `json:"cover_picture"`
	Description string `json:"description"`
	Online bool `json:"online"`
}

// Protected protect routes
func Protected(c *fiber.Ctx) error {
	cookie := c.Cookies("token")
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(cookie, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return jwtError(c, err)
	}
	if !token.Valid {
		return jwtError(c, err)
	}

	user, err := services.GetUserByEmail(claims.Email)
	if err != nil {
		return jwtError(c, err)
	}

	if user.Email != claims.Email {
		return jwtError(c, err)
	}

	return c.Next()
}

func jwtError(c *fiber.Ctx, err error) error {
	return c.Status(fiber.StatusUnauthorized).
		JSON(fiber.Map{"status": "error", "message": "Unauthorized", "data": err})
}
