package controllers

import (
	"fmt"
	"net/http"
	db "stock-management-server/database"
	"stock-management-server/helpers"
	models "stock-management-server/models"

	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context) {

	var users []models.User
	if err := db.DB.Select("EID, First_name, Last_name, Uid").Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}

func CreateUser(c *gin.Context) {
	var users models.User

	if err := c.BindJSON(&users); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	tx := db.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": tx.Error.Error()})
		return
	}

	if err := tx.Create(&users).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "New User Created"})
}

func Login(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	token, refreshToken, err := helpers.GenerateAllTokens(user.EID, user.First_name, user.Last_name, user.Uid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate tokens"})
		return

	}

	if err := helpers.UpdateAllTokens(db.DB, token, refreshToken, user.Uid); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update tokens"})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":        token,
		"refreshToken": refreshToken,
	})
}

func ProtectedEndpoint(w http.ResponseWriter, r *http.Request) {

	claims, ok := r.Context().Value(helpers.UserContextKey).(*helpers.SignedDetails)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	response := fmt.Sprintf("Hello, %s %s !", claims.First_name, claims.Last_name)
	w.Write([]byte(response))

}
