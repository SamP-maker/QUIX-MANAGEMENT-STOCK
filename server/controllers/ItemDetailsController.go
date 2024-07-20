package controllers

import (
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"

	"github.com/gin-gonic/gin"
)

func GetItemDetail(c *gin.Context) {
	rows, err := db.DB.Query("SELECT Item_id, item_quanttiy, item_status, request_id, return_id")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer rows.Close()

	var ItemDetails []models.Item_Details

	for rows.Next() {
		var itemDetail models.Item_Details
		if err := rows.Scan(&itemDetail.ItemID, &itemDetail.ItemQuantity, &itemDetail.Status, &itemDetail.RequestID, &itemDetail.ReturnID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		ItemDetails = append(ItemDetails, itemDetail)

	}

	c.JSON(http.StatusOK, ItemDetails)
}
