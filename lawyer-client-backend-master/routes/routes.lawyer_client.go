package routes

import (
	"github.com/Practicum-1/lawyer-client-backend.git/controllers"
	"github.com/Practicum-1/lawyer-client-backend.git/middleware"
	"github.com/gofiber/fiber/v2"
)

func LawyerClientRoutes(app fiber.Router) error {
	app.Get("/client/:id", middleware.ClientAuth, controllers.GetAllLawyersByClientID)
	app.Get("/lawyer/:id", middleware.LawyerAuth, controllers.GetAllClientsByLawyerID)
	app.Post("/chat", middleware.ClientAuth, controllers.CreateChat)
	app.Get("/chat/:id", middleware.ClientAuth, controllers.GetLawyerClientChat)
	return nil
}
