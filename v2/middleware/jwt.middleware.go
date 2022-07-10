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
}

// Protected protect routes
func Protected(c *fiber.Ctx) error {
	cookie := c.Cookies("token")
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(cookie, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		jwtError(c, err)
	}
	if !token.Valid {
		jwtError(c, err)
	}

	user, err := services.GetUserByEmail(claims.Email)
	if err != nil {
		jwtError(c, err)
	}

	if user.ID != claims.UserID {
		jwtError(c, err)
	}

	return c.Next()
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).
			JSON(fiber.Map{"status": "error", "message": "Missing or malformed JWT", "data": nil})
	}
	return c.Status(fiber.StatusUnauthorized).
		JSON(fiber.Map{"status": "error", "message": "Invalid or expired JWT", "data": nil})
}
