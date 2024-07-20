package controllers

import (
	"net/http"
	db "stock-management-server/database"
	models "stock-management-server/models"

	"github.com/gin-gonic/gin"
)

func GetInventory(c *gin.Context) {

	rows, err := db.DB.Query("SELECT ItemID, ItemName, Count, MissingItem, Broken_Item, Total_Count FROM Inventory")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	defer rows.Close()

	var Inventories []models.Inventory

	for rows.Next() {
		var Inventory models.Inventory
		if err := rows.Scan(&Inventory.ItemID, &Inventory.ItemName, &Inventory.Count, &Inventory.MissingItem, &Inventory.Broken_Item, &Inventory.Total_Count); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		Inventories = append(Inventories, Inventory)

	}

	c.JSON(http.StatusOK, Inventories)

}
