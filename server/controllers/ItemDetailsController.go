package controllers

import (
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"

	"github.com/gin-gonic/gin"
)

func GetItemDetail(c *gin.Context) {
	var itemDetails []models.ItemDetails

	if err := db.DB.Find(&itemDetails).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, itemDetails)
}

func PostItemDetails(c *gin.Context) {
	var itemDetails models.ItemDetails

	tx := db.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
		return
	}

	if err := tx.Create(&itemDetails).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
		return
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Return item and item details status updated successfully"})
	c.JSON(http.StatusOK, itemDetails)
}
