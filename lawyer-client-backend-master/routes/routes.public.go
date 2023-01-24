package routes

import (
	"fmt"

	"github.com/Practicum-1/lawyer-client-backend.git/controllers"
	"github.com/gofiber/fiber/v2"
)

func PublicRoutes(app fiber.Router) error {
	fmt.Printf("%T", app)
	app.Get("/dashboard", controllers.GetDashboardData)
	app.Get("/seeded-data", controllers.GetSeededData)
	app.Get("/test", controllers.Test)

	return nil
}

/*Dashboard par hum ek hi route get karenge backend se jisme
lawyers, clients, reviews, lawyer_clientssetup up*/
