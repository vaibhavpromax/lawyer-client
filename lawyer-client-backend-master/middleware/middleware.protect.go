package middleware

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
	"github.com/gofiber/fiber/v2"
)

func BasicAuth(c *fiber.Ctx) error {
	// Get the basic auth credentials
	auth := c.Get("Authorization")
	if auth == "" {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized No Token", nil)
	}

	//parse Token
	token := strings.TrimSpace(strings.Split(auth, " ")[1])

	jwtMapClaims, err := helpers.ParseToken(token)

	if err != nil {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized Error in Parsing Token", nil)
	}
	//convert float64 to string
	id := strconv.FormatFloat(jwtMapClaims["id"].(float64), 'f', -1, 64)
	c.Request().Header.Add("id", id)
	c.Request().Header.Add("email", string(jwtMapClaims["email"].(string)))

	return c.Next()
}

func LawyerAuth(c *fiber.Ctx) error {
	// Get the basic auth credentials
	fmt.Println("rean")
	auth := c.Get("Authorization")
	if auth == "" {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized No Token", nil)
	}
	//parse Token
	token := strings.TrimSpace(strings.Split(auth, " ")[1])
	jwtMapClaims, err := helpers.ParseToken(token)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized Error in Parsing Token", nil)
	}
	//convert float64 to string
	id := strconv.FormatFloat(jwtMapClaims["id"].(float64), 'f', -1, 64)
	lawyer := models.Lawyer{}
	fmt.Println("email", string(jwtMapClaims["email"].(string)))
	err = repositories.GetLawyerByEmail(string(jwtMapClaims["email"].(string)), &lawyer)
	if err != nil || lawyer.ID == 0 {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized Not a Lawyer", nil)
	}
	c.Request().Header.Add("id", id)
	c.Request().Header.Add("email", string(jwtMapClaims["email"].(string)))

	return c.Next()
}

func ClientAuth(c *fiber.Ctx) error {
	// Get the basic auth credentials
	auth := c.Get("Authorization")
	if auth == "" {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized No Token", nil)
	}
	//parse Token
	token := strings.TrimSpace(strings.Split(auth, " ")[1])
	jwtMapClaims, err := helpers.ParseToken(token)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized", nil)
	}
	//convert float64 to string
	id := strconv.FormatFloat(jwtMapClaims["id"].(float64), 'f', -1, 64)
	client := models.Client{}
	err = repositories.GetClientById(id, &client)
	if err != nil || client.ID == 0 {
		return helpers.SendResponse(c, fiber.StatusUnauthorized, "Unauthorized Not a Client", nil)
	}
	c.Request().Header.Add("id", id)
	c.Request().Header.Add("email", string(jwtMapClaims["email"].(string)))

	return c.Next()
}
