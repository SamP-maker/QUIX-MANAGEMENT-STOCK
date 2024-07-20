package models

import (
	"time"
)

type Item_Details struct {
	ID           int       `json:"id" gorm:"primaryKey;autoIncrement"`
	ItemID       int       `json:"item_id" gorm:"not null"`
	ItemName     string    `json:"item_name" gorm:"not null"`
	ItemQuantity int       `json:"item_quantity" gorm:"not null"`
	Status       string    `json:"status" gorm:"not null"`
	CreatedAt    time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updated_at" gorm:"autoUpdateTime"`
	RequestID    *int      `json:"request_id" gorm:"index"`
	ReturnID     *int      `json:"return_id" gorm:"index"`
}

type ItemStatusUpdate struct {
	ItemID int    `json:"item_id" binding:"required"`
	Status string `json:"status" binding:"required"`
}
