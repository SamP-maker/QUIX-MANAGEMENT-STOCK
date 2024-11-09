package controllers

import (
	"fmt"
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"
	"strings"

	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/gin-gonic/gin"
)

func SearchSuggestions(c *gin.Context) {
	query := c.Query("query")
	var items []models.Inventory

	if err := db.DB.Where("item_name LIKE ?", "%"+query+"%").Limit(10).Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, items)
}

func GetInventory(c *gin.Context) {

	sortOrder := c.Query("sortOrder")
	sortBy := c.Query("sortBy")

	if sortOrder == "" {
		sortOrder = "asc"
	}
	if sortBy == "" {
		sortBy = "created_at"
	}

	var sortByColumn string
	switch sortBy {
	case "updated_at":
		sortByColumn = "updated_at"
	case "created_at":
		sortByColumn = "created_at"

	case "item_id":
		sortByColumn = "item_id"

	case "available":
		sortByColumn = "available"
	case "missing_item":
		sortByColumn = "missing_item"
	case "broken_item":
		sortByColumn = "broken_item"
	case "total_count":
		sortByColumn = "total_count"
	case "price_per_unit_myr":
		sortByColumn = "price_per_unit_myr"
	case "total_stock_price_myr":
		sortByColumn = "total_stock_price_myr"
	case "type":
		sortByColumn = "type"
	default:
		sortByColumn = "created_at"
	}

	var Inventories []models.Inventory

	fmt.Println("SortByColumn:", sortByColumn)
	fmt.Println("SortOrder:", sortOrder)

	if err := db.DB.Select("item_id, item_name, available, in_use, missing_item, broken_item, total_count,created_at,updated_at, price_per_unit_myr, total_stock_price_myr, Type").
		Order(sortByColumn + " " + strings.ToUpper(sortOrder)).
		Find(&Inventories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	columnHeaders := []string{"item_id", "item_name", "available", "in_use", "missing_item", "broken_item", "total_count", "price_per_unit_myr", "total_stock_price_myr", "created_at", "updated_at"}

	c.JSON(http.StatusOK, gin.H{
		"columns":     columnHeaders,
		"inventories": Inventories,
	})

}

func PostInventory(c *gin.Context) {
	var inventory models.Inventory

	//Bind the inventory pointer to JSON
	if err := c.BindJSON(&inventory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()}) //err response
		return
	}

	tx := db.DB.Begin() //init db
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
		return
	}

	if err := tx.Create(&inventory).Error; err != nil { //insert function
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := tx.Commit().Error; err != nil { //confirm the commit
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transation"})

		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item added successfully"})

}
