package models 

import "gorm.io/gorm"

// Review struct
type Review struct {
	gorm.Model
	Rating int `gorm:"not null" json:"rating"`
	Comment string `gorm:"not null" json:"comment"`
	PostID int `gorm:"not null" json:"post_id"`
	UserID int `gorm:"not null" json:"user_id"`

	Post Post `gorm:"foreignkey:PostID" json:"post"`
	User User `gorm:"foreignkey:UserID" json:"user"`
}