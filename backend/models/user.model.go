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

	Messages []Message `gorm:"foreignkey:UserID" json:"messages"`
	Images []Image `gorm:"foreignkey:UserID" json:"images"`
	Posts []Post `gorm:"foreignkey:UserID" json:"posts"`
	Bookings []Booking `gorm:"foreignkey:UserID" json:"bookings"`
	HostChats []Chat `gorm:"foreignkey:HostID" json:"host_chats"`
	GuestChats []Chat `gorm:"foreignkey:GuestID" json:"guest_chats"`
	Reviews []Review `gorm:"foreignkey:UserID" json:"reviews"`
}
