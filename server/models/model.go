package models

type User struct {
	EID        string `json:"EID" gorm:"column:EID;primaryKey"`
	First_name string `json:"first_name" validate:"required,min=2,max=100" gorm:"not null"`
	Last_name  string `json:"last_name" validate:"required,min=2,max=100" gorm:"not null"`
	Uid        string `json:"uid"  validate:"required,min=2,max=100" gorm:"uniqueIndex;autoIncrement"`
	// Add other fields as needed
}
