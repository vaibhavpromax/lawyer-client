package routes

import (
	"github.com/Practicum-1/lawyer-client-backend.git/controllers"
	"github.com/Practicum-1/lawyer-client-backend.git/middleware"
	"github.com/gofiber/fiber/v2"
)

func ClientRoutes(app fiber.Router) error {
	app.Get("/", middleware.BasicAuth, controllers.GetAllClients)
	app.Get("/:id", middleware.BasicAuth, controllers.GetClientById)
	app.Post("/", controllers.CreateClient)
	app.Get("/:id/lawyers", middleware.BasicAuth, controllers.GetAllLawyersByClientID)
	return nil
}
