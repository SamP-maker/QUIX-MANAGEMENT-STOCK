package main

import (
	controller "stock-management-server/controllers"
	db "stock-management-server/database"

	"github.com/gin-gonic/gin"
)

func main() {
	/*port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	router := gin.New()

	routes.UserRoutes(router)

	router.Run(":" + port)*/
	db.Connect()
	r := gin.Default()

	r.POST("/postUsers", controller.CreateUser)
	r.Run(":8080")
}
