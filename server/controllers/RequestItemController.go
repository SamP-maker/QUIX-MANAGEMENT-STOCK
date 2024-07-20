package controllers

import (
	"database/sql"
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"
	"time"

	"github.com/gin-gonic/gin"
)

func GetRequestItemList(c *gin.Context) {
	rows, err := db.DB.Query("SELECT item_id, request_id, returner_id, created_at, updated_at, status, Items from RequestID")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer rows.Close()

	var requestItems []models.RequestItem

	for rows.Next() {
		var requestItem models.RequestItem
		if err := rows.Scan(&requestItem.ItemID, &requestItem.RequestID, &requestItem.ReturnerID, &requestItem.CreatedAt, &requestItem.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		itemDetailsRows, err := db.DB.Query("SELECT id, item_id, item_name, item_quantity, status, created_at, updated_at, request_id, return_id FROM item_details WHERE request_id = ?", requestItem.RequestID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		defer itemDetailsRows.Close()

		var itemDetails []models.Item_Details

		for itemDetailsRows.Next() {
			var itemDetail models.Item_Details
			if err := itemDetailsRows.Scan(&itemDetail.ID, &itemDetail.ItemID, &itemDetail.ItemName, &itemDetail.ItemQuantity, &itemDetail.Status, &itemDetail.CreatedAt, &itemDetail.UpdatedAt, &itemDetail.RequestID, &itemDetail.ReturnID); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			itemDetails = append(itemDetails, itemDetail)
		}
		requestItem.Items = itemDetails
		requestItems = append(requestItems, requestItem)

	}
	c.JSON(http.StatusOK, requestItems)
}

func PostRequestItemList(c *gin.Context) {
	var postRequest models.RequestItem
	if err := c.BindJSON(&postRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx, err := db.DB.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	postRequestItem := "INSERT INTO request_items (ItemID,RequestID,ReturnerID,Status,Items) VALUES (?,?,?,?,?)"
	if _, err := tx.Exec(postRequestItem, postRequest.ItemID, postRequest.RequestID, postRequest.ReturnerID, postRequest.Status, postRequest.Items); err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for _, itemDetail := range postRequest.Items {
		postItemDetailsSQL := "INSERT INTO item_details (ItemID, ItemName,ItemQuantity,Status,RequestID,ReturnID) VALUES (?,?,?,?,?,?)"
		if _, err := tx.Exec(postItemDetailsSQL, itemDetail.ItemID, itemDetail.ItemName, itemDetail.RequestID, itemDetail.ReturnID, itemDetail.Status); err != nil {

			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})

			return
		}
	}

	if err := tx.Commit(); err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Return item and item details status updated successfully"})
}

func UpdatePostItemList(c *gin.Context) {

	var updateRequest []models.Item_Details
	if err := c.BindJSON(&updateRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx, err := db.DB.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for _, itemDetails := range updateRequest {

		var existingItems models.Item_Details
		err := tx.QueryRow("SELECT id, item_quantity FROM item_details WHERE item_id = ?", itemDetails.ItemID).Scan(&existingItems.ID, &existingItems.ItemQuantity)

		if err == sql.ErrNoRows {
			addItemSQL := "INSERT INTO item_details (ItemID, ItemName, ItemQuantity, Status, CreatedAt, UpdatedAt, RequestID, ReturnID) VALUES (?,?,?,?,?,?,?,?)"
			if _, err := tx.Exec(addItemSQL, itemDetails.ItemID, itemDetails.ItemName, itemDetails.ItemQuantity, itemDetails.Status, time.Now(), time.Now(), itemDetails.RequestID, itemDetails.ReturnID); err != nil {

				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		} else if err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		} else {

			if itemDetails.ItemQuantity <= 0 {
				removeItemSQL := "DELETE FROM item_details WHERE item_id = ?"
				if _, err := tx.Exec(removeItemSQL, itemDetails.ItemID); err != nil {
					tx.Rollback()
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return

				}
			} else {
				updateItemSQL := "UPDATE item_Details SET iTEMnAME = ? , ItemQuantity = ?, Status = ?, UpdatedAt, RequestID =?, ReturnID = ? WHERE item_id = ?"
				if _, err := tx.Exec(updateItemSQL, itemDetails.ItemName, itemDetails.ItemQuantity, itemDetails.Status, time.Now(), itemDetails.RequestID, itemDetails.ReturnID, itemDetails.ItemID); err != nil {
					tx.Rollback()
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
			}
		}

	}

	c.JSON(http.StatusOK, gin.H{"message": "Item details updated successfully"})
}
