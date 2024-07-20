package models

type ReturnItem struct {
	ItemID     int            `json:"item_id" gorm:"primaryKey; autoIncrement"`
	RequestID  int            `json:"request_id" gorm:"not null"`
	ReturnerID string         `json:"returner_id" validate:"required,min=2,max=100" gorm:"not null"`
	CreatedAt  int            `json:"created_at gorm:"autoUpdateTime"`
	UpdatedAt  int            `json:"updated_at" gorm:"autoUpdateTime"`
	Status     string         `json:"status" validate:"required,min=2,max=100" gorm:"not null"`
	Items      []Item_Details `json:"items" gorm:"foreignKey:ReturnID"`
}
