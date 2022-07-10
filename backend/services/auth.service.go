package services

import (
	"vicariously/config"
	"vicariously/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

// CheckPasswordHash compare password with hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

var jwtKey = []byte(config.Config("SECRET"))

type Claims struct {
	Email string `json:"email"`
	UserID uint `json:"user_id"`
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

// Parse JWT, find user and return user
func Restore(c *fiber.Ctx) error {
	cookie := c.Cookies("token")

	// tokenStr := cookie.Value
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(cookie, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return c.Status(200).JSON(fiber.Map{"status": "error", "message": "Invalid token", "data": nil})
	}
	if !token.Valid {
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Invalid token", "data": nil})
	}

	user, err := GetUserByEmail(claims.Email)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Invalid token", "data": nil})
	}

	safeUser := SafeUser{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		ProfilePicture: user.ProfilePicture,
		CoverPicture: user.CoverPicture,
		Description: user.Description,
		Online: user.Online,
	}

	expirationTime := time.Now().Add(1 * time.Hour)

	newClaims := &Claims{
		Email: safeUser.Email,
		UserID: safeUser.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, newClaims)
	tokenString, err := newToken.SignedString(jwtKey)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	c.Cookie(&fiber.Cookie{
		Expires: expirationTime,
		Path:    "/",
		Secure:  config.Config("ENVIRONMENT") == "production",
		SameSite: "Lax",
		HTTPOnly: true,
		Value:  tokenString,
		Name:    "token",
	})


	return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": safeUser})
}

// Login get user and password
func Login(c *fiber.Ctx) error {
	type LoginInput struct {
		Email string `json:"email"`
		Password string `json:"password"`
	}
	type UserData struct {
		ID       uint   `json:"id"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	var input LoginInput
	var ud UserData

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}
	identity := input.Email
	pass := input.Password

	user, err := GetUserByEmail(identity)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Error on email", "data": err})
	}

	if user == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "User not found", "data": err})
	}

	ud = UserData{
		ID:       user.ID,
		Email:    user.Email,
		Password: user.Password,
	}

	if !CheckPasswordHash(pass, ud.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Invalid password", "data": nil})
	}

	expirationTime := time.Now().Add(1 * time.Hour)

	claims := &Claims{
		Email: ud.Email,
		UserID: ud.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	c.Cookie(&fiber.Cookie{
		Expires: expirationTime,
		Path:    "/",
		Secure:  config.Config("ENVIRONMENT") == "production",
		SameSite: "Lax",
		HTTPOnly: true,
		Value:  tokenString,
		Name:    "token",
	})

	user.Online = true
	config.DB.Save(&user)

	safeUser := SafeUser{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		ProfilePicture: user.ProfilePicture,
		CoverPicture: user.CoverPicture,
		Description: user.Description,
		Online: user.Online,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Success login", "data": safeUser})
}

// Signup create user, return cookie and user
func Signup(c *fiber.Ctx) error {
	user := new(models.User)

	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on signup request", "data": err})
	}

	email := user.Email
	pass := user.Password
	username := user.Username

	if err := config.DB.Where(&models.User{Email: email}).First(&models.User{}).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"status": "error", "message": "User already exists", "data": nil})
	}

	if err := config.DB.Where(&models.User{Username: username}).First(&models.User{}).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"status": "error", "message": "User already exists", "data": nil})
	}

	hash, err := HashPassword(pass)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Couln't hash password", "data": err})
	}

	user.Password = hash
	if err := config.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error on signup request", "data": err})
	}

	expirationTime := time.Now().Add(1 * time.Hour)

	claims := &Claims{
		Email: user.Email,
		UserID: user.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "error", "message": "Error on login request", "data": err})
	}

	c.Cookie(&fiber.Cookie{
		Expires: expirationTime,
		Path:    "/",
		Secure:  config.Config("ENVIRONMENT") == "production",
		SameSite: "Lax",
		HTTPOnly: true,
		Value:  tokenString,
		Name:    "token",
	})
	
	user.Online = true
	config.DB.Save(&user)

	safeUser := SafeUser{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		ProfilePicture: user.ProfilePicture,
		CoverPicture: user.CoverPicture,
		Description: user.Description,
		Online: user.Online,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Success login", "data": safeUser})
}

// Logout delete cookie
func Logout(c *fiber.Ctx) error {
	input := new(models.User)

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error", "message": "Error on signup request", "data": err})
	}

	user, err := GetUserByEmail(input.Email)

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error", "message": "Error on email", "data": err})
	}

	user.Online = false
	config.DB.Save(&user)

	cookie := new(fiber.Cookie)
	cookie.Name = "token"
	cookie.Expires = time.Now().AddDate(0, 0, -1)
	cookie.Path = "/"
	cookie.Secure = false
	cookie.HTTPOnly = true
	c.Cookie(cookie)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Success logout", "data": nil})
}
