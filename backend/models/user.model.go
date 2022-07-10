package models

import "gorm.io/gorm"

// User struct
type User struct {
	gorm.Model
	Username string `gorm:"unique;not null" json:"username"`
	Email    string `gorm:"index;unique;not null" json:"email"`
	Password string `gorm:"not null" json:"password"`
	ProfilePicture string `json:"profile_picture"`
	CoverPicture string `json:"cover_picture"`
	Description string `json:"description"`
	Online bool `json:"online"`
}
