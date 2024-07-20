package models

import "time"

type RequestItem struct {
	ItemID     int            `json:"item_id" gorm:"primaryKey; autoIncrement"`
	RequestID  string         `json:"item_Name" gorm:"not null"`
	ReturnerID int            `json:"quantity" gorm:"not null"`
	CreatedAt  time.Time      `json:"missing_Item gorm:"not null"`
	UpdatedAt  time.Time      `json:"broken_Item" gorm:"not null"`
	Status     string         `json:"total_Count" gorm:"not null"`
	Items      []Item_Details `json:"items" gorm:"foreignKey:RequestID"`
}

type UpdateStatusRequest struct {
	ReturnItemID int                `json"return_item_id" binding:"required"`
	Status       string             `json:"status" binding:"required"`
	ItemStatuses []ItemStatusUpdate `json:"item_statuses"`
}
