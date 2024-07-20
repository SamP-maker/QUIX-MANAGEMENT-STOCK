package models

type Inventory struct {
	ItemID      int    `json:"item_id" gorm:"primaryKey; autoIncrement"`
	ItemName    string `json:"item_Name" gorm:"not null"`
	Count       int    `json:"quantity" gorm:"not null"`
	MissingItem int    `json:"missing_Item gorm:"not null"`
	Broken_Item int    `json:"broken_Item" gorm:"not null"`
	Total_Count int    `json:"total_Count" gorm:"not null"`
}
