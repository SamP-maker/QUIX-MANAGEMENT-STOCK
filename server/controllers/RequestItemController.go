package controllers

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func CopyRequestListtoReturns(requestID int) error {
	var requestItem models.RequestItem
	if err := db.DB.Preload("Items").First(&requestItem, requestID).Error; err != nil {
		return err
	}

	returnItem := models.ReturnItem{
		RequestID:     &requestItem.RequestID,
		ReturnerID:    requestItem.ReturnerID,
		CreatedAt:     &requestItem.CreatedAt,
		UpdatedAt:     time.Now(),
		ExpiredAt:     requestItem.ExpiredAt,
		ReturnStatus:  requestItem.ReturnStatus,
		RequestStatus: &requestItem.RequestStatus,
		WorkOrder:     &requestItem.WorkOrder,
		Team:          &requestItem.Team,
		Department:    &requestItem.Department,
		Items:         requestItem.Items,
	}

	tx := db.DB.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	if err := tx.Create(&returnItem).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

func GetRequestItemList(c *gin.Context) {

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

	var requestItems []models.RequestItem

	if err := db.DB.Preload("Items").
		Order(sortByColumn + " " + strings.ToUpper(sortOrder)).
		Find(&requestItems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var transformedData []map[string]interface{}
	for _, requestItem := range requestItems {
		itemDetails := make([]map[string]interface{}, len(requestItem.Items))
		for i, item := range requestItem.Items {
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
			"request_id":     requestItem.RequestID,
			"returner_id":    requestItem.ReturnerID,
			"created_at":     requestItem.CreatedAt,
			"updated_at":     requestItem.UpdatedAt,
			"return_status":  requestItem.ReturnStatus,
			"request_status": requestItem.RequestStatus,
			"work_order":     requestItem.WorkOrder,
			"team":           requestItem.Team,
			"department":     requestItem.Department,
			"items":          itemDetails,
		})
	}

	columnHeaders := []string{"request_id", "returner_id", "created_at", "updated_at", "Return_status", "Request_status", "Work_Order", "Team", "Department", "Items"}
	c.JSON(http.StatusOK, gin.H{
		"columns": columnHeaders,
		"request": transformedData,
	})
}

func PostRequestItemList(c *gin.Context) {
	// Read and log the body
	body, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read request body"})
		return
	}
	c.Request.Body = io.NopCloser(bytes.NewBuffer(body)) // Reset the body
	log.Printf("Received payload: %s", body)

	// Check Content-Type
	if c.ContentType() != "application/json" {
		c.JSON(http.StatusUnsupportedMediaType, gin.H{"error": "Content-Type must be application/json"})
		return
	}

	// Bind JSON to struct
	var postRequest models.RequestItem
	if err := c.BindJSON(&postRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Log the parsed struct
	log.Printf("Parsed RequestItem: %+v", postRequest)

	// Start transaction
	tx := db.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
		return
	}

	// Create request item
	if err := tx.Create(&postRequest).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Copy request list to returns if status is approved
	if strings.ToLower(postRequest.RequestStatus) == "approved" {
		if err := CopyRequestListtoReturns(postRequest.RequestID); err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// Commit transaction
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Return item and item details status updated successfully"})
}

func UpdateRequestItemList(c *gin.Context) {

	var updateRequest []models.ItemDetails
	if err := c.BindJSON(&updateRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx := db.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
		return
	}

	for _, itemDetails := range updateRequest {

		var existingItems models.ItemDetails
		if err := tx.Where("item_id = ?", itemDetails.ItemID).First(&existingItems).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				if err := tx.Create(&itemDetails).Error; err != nil {
					tx.Rollback()
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}

			} else {

				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return

			}

		} else {
			if itemDetails.ItemQuantity <= 0 {
				if err := tx.Delete(&existingItems).Error; err != nil {
					tx.Rollback()
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
			} else {
				existingItems.ItemName = itemDetails.ItemName
				existingItems.ItemQuantity = itemDetails.ItemQuantity
				existingItems.Status = itemDetails.Status
				existingItems.UpdatedAt = time.Now()
				existingItems.RequestID = itemDetails.RequestID
				existingItems.ReturnID = itemDetails.ReturnID

				if err := tx.Save(&existingItems).Error; err != nil {
					tx.Rollback()
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
			}
		}

	}

	c.JSON(http.StatusOK, gin.H{"message": "Item details updated successfully"})
}

func UpdateInventoryOnRequest(itemID int, quantity int) error {
	var inventory models.Inventory
	var requests models.RequestItem

	tx := db.DB.Begin()
	if err := tx.Where("item_id = ?", itemID).First(&inventory).Error; err != nil {
		tx.Rollback()
		return err
	}

	if inventory.Available < quantity {
		tx.Rollback()
		return fmt.Errorf("Items are not in stock")
	}

	if err := tx.Where("request_id = ?", itemID).First(&requests.RequestID).Error; err != nil {
		tx.Rollback()
		return err
	}

	requests.RequestStatus = strings.ToLower(requests.RequestStatus)

	if requests.RequestStatus == "accepted" {
		requests.ReturnStatus = "pending"
	}

	inventory.InUse += quantity
	inventory.Available -= quantity

	if err := db.DB.Save(&inventory).Error; err != nil {
		return err
	}
	return nil
}
