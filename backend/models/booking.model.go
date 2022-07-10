package models 

import "gorm.io/gorm"

// Booking struct 
type Booking struct {
	gorm.Model
	StartDate string `gorm:"not null" json:"start_date"`
	EndDate string `gorm:"not null" json:"end_date"`
	Confirmed bool `json:"confirmed"`
	PostID int `json:"post_id"`
	UserID int `json:"user_id"`

	Post Post `gorm:"foreignkey:PostID" json:"post"`
	User User `gorm:"foreignkey:UserID" json:"user"`
}