package models

import "time"

type Inventory struct {
	ItemID             int       `json:"item_id" gorm:"primaryKey;autoIncrement"`
	ItemName           string    `json:"item_name" gorm:"not null"`
	Available          int       `json:"available" gorm:"not null"`
	InUse              int       `json:"in_use" gorm:"not null"`
	MissingItem        int       `json:"missing_item" gorm:"not null"`
	BrokenItem         int       `json:"broken_item" gorm:"not null"`
	TotalCount         int       `json:"total_count" gorm:"not null"`
	CreatedAt          time.Time `json:"created_at" gorm:"not null"`
	UpdatedAt          time.Time `json:"updated_at" gorm:"not null"`
	PricePerUnitMYR    int       `json:"price_per_unit_myr" gorm:"not null"`
	TotalStockPriceMYR int       `json:"total_stock_price_myr" gorm:"not null"`
	Type               string    `json:"type" gorm:"not null"`
}
