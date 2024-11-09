package database

import (
	"stock-management-server/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() error {
	var err error
	dsn := "root:1234@tcp(127.0.0.1:3306)/test?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	// Automatically migrate your schema
	if err := DB.AutoMigrate(&models.Inventory{}, &models.RequestItem{}, &models.ReturnItem{}, &models.ItemDetails{}); err != nil {
		return err
	}

	return nil
}
