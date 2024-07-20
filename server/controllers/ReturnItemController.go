package controllers

import (
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"

	"github.com/gin-gonic/gin"
)

/*
1. return list
2. pending return list


*/

func GetReturnItemList(c *gin.Context) {
	rows, err := db.DB.Query("SELECT item_id, request_id, returner_id, created_at, updated_at, status, Items from ReturnID ")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer rows.Close()

	var returnItems []models.ReturnItem

	for rows.Next() {
		var returnItem models.ReturnItem
		if err := rows.Scan(&returnItem.ItemID, &returnItem.RequestID, &returnItem.ReturnerID, &returnItem.CreatedAt, &returnItem.UpdatedAt, &returnItem.Status, &returnItem.Items); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		returnItems = append(returnItems, returnItem)

	}

	c.JSON(http.StatusOK, returnItems)
}

func PostReturnItemList(c *gin.Context) {
	var postReturn models.ReturnItem
	if err := c.BindJSON(&postReturn); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	tx, err := db.DB.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

		return
	}

	postReturnItemSQL := "INSERT INTO return_items (ItemID,RequestID,ReturnerID,Status,Items) VALUES (?,?,?,?,?)"
	if _, err := tx.Exec(postReturnItemSQL, postReturn.ItemID, postReturn.RequestID, postReturn.ReturnerID, postReturn.Status, postReturn.Items); err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for _, itemDetail := range postReturn.Items {
		postItemDetailsSQL := "INSERT INTO item_details (ItemID,ItemName,ItemQuantity,Status,RequestID,ReturnID) VALUES (?,?,?,?,?,?,?)"
		if _, err := tx.Exec(postItemDetailsSQL, itemDetail.ItemID, itemDetail.RequestID, itemDetail.ReturnID, itemDetail.Status); err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

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

func UpdateReturnItemList(c *gin.Context) {
	var updateReq models.UpdateStatusRequest
	if err := c.BindJSON(&updateReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx, err := db.DB.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update return item status"})
		return
	}

	updateReturnItemSQL := "UPDATE return_items SET status = ? WHERE item_id = ? "
	if _, err := tx.Exec(updateReturnItemSQL, updateReq.Status, updateReq.ReturnItemID); err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

		return
	}

	for _, itemStatus := range updateReq.ItemStatuses {
		updateItemDetailsSQL := "UPDATE item_details SET status = ? WHERE id = ?"
		if _, err := tx.Exec(updateItemDetailsSQL, itemStatus.Status, itemStatus.ItemID); err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

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
