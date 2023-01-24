package routes

import (
	"github.com/Practicum-1/lawyer-client-backend.git/controllers"
	"github.com/Practicum-1/lawyer-client-backend.git/middleware"
	"github.com/gofiber/fiber/v2"
)

func LawyerRoutes(app fiber.Router) error {
	app.Get("/filters", middleware.BasicAuth, controllers.GetLawyerByFilter)
	app.Get("/", middleware.BasicAuth, controllers.GetAllLawyer)
	app.Get("/:id", middleware.BasicAuth, controllers.GetLawyerById)
	app.Post("/", controllers.CreateLawyer)
	return nil
}
