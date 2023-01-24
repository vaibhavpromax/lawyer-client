package routes

import (
	"github.com/Practicum-1/lawyer-client-backend.git/controllers"
	"github.com/Practicum-1/lawyer-client-backend.git/middleware"
	"github.com/gofiber/fiber/v2"
)

func ReviewRoutes(app fiber.Router) error {
	app.Get("/lawyer/:id", middleware.BasicAuth, controllers.GetReviewsByLawyerID)
	app.Get("/client/:id", middleware.ClientAuth, controllers.GetReviewsByClientID)
	app.Post("/", middleware.ClientAuth, controllers.CreateReview)
	// app.Use(middleware.ClientAuth).Patch("/:id", controllers.UpdateRequest)
	return nil
}
