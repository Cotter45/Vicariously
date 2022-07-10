package models

import "gorm.io/gorm"

// Message struct
type Message struct {
	gorm.Model
	Message string `json:"message"`
	ImageID int `json:"image_id"`
	UserID int `gorm:"not null" json:"user_id"`
	ChatID int `gorm:"not null" json:"chat_id"`

	User User `gorm:"foreignkey:UserID"`
	Chat Chat `gorm:"foreignkey:ChatID"`
	Image Image `gorm:"foreignkey:ImageID"`
}