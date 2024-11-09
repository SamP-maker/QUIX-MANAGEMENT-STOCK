package controllers

import (
	"fmt"
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"
	"strings"

	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

func GetReturnItemList(c *gin.Context) {

	sortOrder := c.Query("sortOrder")
	sortBy := c.Query("sortBy")

	if sortOrder == "" {
		sortOrder = "asc"
	}
	if sortBy == "" {
		sortBy = "created_At"
	}

	var sortByColumn string
	switch sortBy {
	case "updated_at":
		sortByColumn = "updated_at"
	case "created_at":
		sortByColumn = "created_at"
	case "request_status":
		sortByColumn = "request_status"
	case "request_id":
		sortByColumn = "request_id"
	case "returner_id":
		sortByColumn = "returner_id"
	case "work_order":
		sortByColumn = "work_order"
	case "team":
		sortByColumn = "team"
	case "department":
		sortByColumn = "department"
	case "expired_at":
		sortByColumn = "expired_at"
	default:
		sortByColumn = "created_at"
	}

	var returnItems []models.ReturnItem

	if err := db.DB.Preload("Items").
		Order(sortByColumn + " " + strings.ToUpper(sortOrder)).
		Find(&returnItems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var transformedData []map[string]interface{}
	for _, returnItem := range returnItems {
		itemDetails := make([]map[string]interface{}, len(returnItem.Items))
		for i, item := range returnItem.Items {
			itemDetails[i] = map[string]interface{}{
				"id":            item.ID,
				"item_id":       item.ItemID,
				"item_name":     item.ItemName,
				"item_quantity": item.ItemQuantity,
				"status":        item.Status,
				"created_at":    item.CreatedAt,
				"updated_at":    item.UpdatedAt,
				"request_id":    item.RequestID,
				"return_id":     item.ReturnID,
			}
		}
		transformedData = append(transformedData, map[string]interface{}{
			"request_id":     returnItem.RequestID,
			"returner_id":    returnItem.ReturnerID,
			"created_at":     returnItem.CreatedAt,
			"updated_at":     returnItem.UpdatedAt,
			"return_status":  returnItem.ReturnStatus,
			"request_status": returnItem.RequestStatus,
			"work_order":     returnItem.WorkOrder,
			"team":           returnItem.Team,
			"department":     returnItem.Department,
			"items":          itemDetails,
		})
	}

	columnHeaders := []string{"request_id", "returner_id", "created_at", "updated_at", "Request_status", "Work_Order", "Team", "Department", "Items"}
	c.JSON(http.StatusOK, gin.H{
		"columns": columnHeaders,
		"request": transformedData,
	})
}

func PostReturnItemList(c *gin.Context) {
	var postReturn models.ReturnItem
	if err := c.BindJSON(&postReturn); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	tx := db.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})

		return
	}

	if err := tx.Create(&postReturn).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transcation"})

		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Item added successfully"})

}

func UpdateReturnItemList(c *gin.Context) {
	var updateReq models.ReturnItem
	if err := c.BindJSON(&updateReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx := db.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update return item status"})
		return
	}

	if err := tx.Save(&updateReq).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for _, item := range updateReq.Items {
		if err := UpdateInventoryOnReturn(item.ItemID, item.Status, tx); err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	tx.Commit()
	c.JSON(http.StatusOK, gin.H{"message": "Item updated successfully"})
}

func UpdateInventoryOnReturn(itemID int, status string, tx *gorm.DB) error {
	var inventory models.Inventory
	if err := tx.Where("item_id = ?", itemID).First(&inventory).Error; err != nil {
		return err
	}

	switch status {
	case "missing":
		inventory.MissingItem++
	case "broken":
		inventory.BrokenItem++
	case "returned":
		inventory.InUse--
		inventory.Available++
	default:
		return fmt.Errorf("invalid status")
	}

	if err := tx.Save(&inventory).Error; err != nil {
		return err
	}
	return nil
}
