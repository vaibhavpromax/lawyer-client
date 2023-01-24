package routes

import (
	"github.com/Practicum-1/lawyer-client-backend.git/controllers"
	"github.com/Practicum-1/lawyer-client-backend.git/middleware"
	"github.com/gofiber/fiber/v2"
)

func RequestRoutes(app fiber.Router) error {
	app.Get("/:id", middleware.BasicAuth, controllers.GetRequest)
	app.Post("/", middleware.ClientAuth, controllers.CreateRequest)
	app.Delete("/:id", middleware.ClientAuth, controllers.DeleteRequest)
	app.Patch("/:status/:id", middleware.LawyerAuth, controllers.ChangeRequestStatus)
	// app.Use(middleware.ClientAuth).Patch("/:id", controllers.UpdateRequest)
	return nil
}
