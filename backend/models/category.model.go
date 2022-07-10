package models 

 import "gorm.io/gorm"

 // Category struct
 type Category struct {
	gorm.Model 
	Name string `gorm:"unique;not null" json:"name"`
	Description string `json:"description"`

	Posts []Post `gorm:"foreignkey:CategoryID" json:"posts"`
}