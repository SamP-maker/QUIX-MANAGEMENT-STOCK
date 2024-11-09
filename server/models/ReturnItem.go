package models

import "time"

type ReturnItem struct {
	RequestID     *int          `json:"request_id" gorm:"primaryKey;autoIncrement"`
	ReturnerID    int           `json:"returner_id" gorm:"not null"`
	CreatedAt     *time.Time    `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time     `json:"updated_at" gorm:"autoUpdateTime"`
	ExpiredAt     time.Time     `json:"expire_at"`
	ReturnStatus  string        `json:"return_status" gorm:"not null"`
	RequestStatus *string       `json:"request_status" gorm:"not null"`
	WorkOrder     *string       `json:"work_order" gorm:"not null"`
	Team          *string       `json:"team" gorm:"not null"`
	Department    *string       `json:"department" gorm:"not null"`
	Items         []ItemDetails `json:"items" gorm:"foreignKey:RequestID;references:RequestID"`
}
