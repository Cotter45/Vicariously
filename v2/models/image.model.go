package models

import "gorm.io/gorm"

 // Image struct
type Image struct {
	gorm.Model
	Name string `json:"name"`
	Description string `json:"description"`
	Url string `json:"url"`
	PostID int `json:"post_id"`
	UserID int `json:"user_id"`

	Messages []Message `gorm:"foreignkey:ImageID" json:"messages"`
	Post Post `gorm:"foreignkey:PostID" json:"post"`
	User User `gorm:"foreignkey:UserID" json:"user"`
}