package models

import "gorm.io/gorm"

// Chat struct
type Chat struct {
	gorm.Model
	Name string `json:"name"`
	HostID int `json:"host_id"`
	GuestID int `json:"guest_id"`

	Host User `gorm:"foreignkey:HostID"`
	Guest User `gorm:"foreignkey:GuestID"`
	Messages []Message `gorm:"foreignkey:ChatID" json:"messages"`
}