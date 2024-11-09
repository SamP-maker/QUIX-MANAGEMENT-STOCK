package main

import (
	"log"
	"stock-management-server/controllers"
	"stock-management-server/database"
	"time"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	if err := database.InitDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	r := gin.Default()

	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	r.Use(cors.New(config))

	//User//
	r.GET("/GetUsers", controllers.GetUsers)
	r.POST("/postUsers", controllers.CreateUser)

	//RequestItems/
	r.GET("/getRequestItems", controllers.GetRequestItemList)
	r.POST("/postRequestItems", controllers.PostRequestItemList)
	r.PUT("/updateRequestItemList", controllers.UpdateRequestItemList)

	//ReturnItems/
	r.GET("/getReturnItemList", controllers.GetReturnItemList)
	r.POST("/postReturnItemList", controllers.PostReturnItemList)
	r.PUT("/updateReturnItemList", controllers.UpdateReturnItemList)

	//Inventory/
	r.GET("/getInventory", controllers.GetInventory)
	r.POST("/PostInventory", controllers.PostInventory)
	r.GET("/search-suggestion/search", controllers.SearchSuggestions)

	//ItemDetails/
	r.POST("postItemDetatil", controllers.PostItemDetails)
	r.Run(":8080")

}
