package routes

import (
	controller "stock-management-server/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.GET("/users", controller.GetUsers)
	incomingRoutes.POST("/postUsers", controller.CreateUser)

}
