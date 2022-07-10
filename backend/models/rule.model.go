package models 

import "gorm.io/gorm"

// Rule struct
type Rule struct {
	gorm.Model
	Name string `gorm:"not null" json:"name"`
	Description string `gorm:"not null" json:"description"`
	PostID int `gorm:"not null" json:"post_id"`

	Post Post `gorm:"foreignkey:PostID" json:"post"`
}