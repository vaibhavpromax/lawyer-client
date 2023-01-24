package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Practicum-1/lawyer-client-backend.git/db"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/routes"
	"github.com/Practicum-1/lawyer-client-backend.git/seeds"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func setupRoutes(app *fiber.App) {
	routes.PublicRoutes(app.Group("/public"))
	routes.AuthRoutes(app.Group("/auth"))
	routes.ClientRoutes(app.Group("/client"))
	routes.LawyerRoutes(app.Group("/lawyer"))
	routes.RequestRoutes(app.Group("/request"))
	routes.ReviewRoutes(app.Group("/review"))
	routes.LawyerClientRoutes(app.Group("/lawyer_client"))
}

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db.ConnectDB()
	models.Migrate()
	seeds.RunSeeds()

}

func main() {

	app := fiber.New()
	app.Use(cors.New())

	app.Use(logger.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"msg": fmt.Sprintf("server running on %s", os.Getenv("PORT"))})
	})

	setupRoutes(app)

	err := app.Listen(os.Getenv("PORT"))
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("server running on", os.Getenv("PORT"))
}
