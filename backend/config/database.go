package config

import (
	"fmt"
	"vicariously/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ConnectDB connect to db
func ConnectDB() {
	var err error
	if err != nil {
		fmt.Println(err)
	}
	url := Config("DATABASE_URL")
	DB, err = gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("Connection Opened to Database")

	DB.AutoMigrate(&models.User{})
	fmt.Println("Database Migrated")
}

var DB *gorm.DB