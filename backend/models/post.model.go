package models 

 import "gorm.io/gorm"

 // Post struct
type Post struct {
	gorm.Model 
	Title string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`
	Address string `gorm:"not null" json:"address"`
	UserID int `gorm:"not null" json:"user_id"`
	CategoryID int `gorm:"not null" json:"category_id"`

	Images []Image `gorm:"foreignkey:PostID" json:"images"`
	User User `gorm:"foreignkey:UserID" json:"user"`
	Category Category `gorm:"foreignkey:CategoryID" json:"category"`
	Bookings []Booking `gorm:"foreignkey:PostID" json:"bookings"`
	Reviews []Review `gorm:"foreignkey:PostID" json:"reviews"`
	Rules []Rule `gorm:"foreignkey:PostID" json:"rules"`
}