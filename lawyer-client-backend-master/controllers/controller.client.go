package controllers

import (
	"fmt"
	"strconv"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
	"github.com/gofiber/fiber/v2"
)

func GetAllClients(c *fiber.Ctx) error {
	client, err := repositories.GetAllClients()
	if err != nil {
		if err.Error() == "404" {
			return helpers.SendResponse(c, fiber.StatusNotFound, "No client found", nil)
		} else {
			return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
		}
	}
	return helpers.SendResponse(c, fiber.StatusOK, "success", client)
}

func GetClientById(c *fiber.Ctx) error {

	id, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "response": "Invalid Id"})
	}

	var client models.Client
	err = repositories.GetClientById(id, &client)
	if err != nil {
		if err.Error() == "404" {
			c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "msg": "Client not found"})
		} else {
			c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "msg": "Failed to fetch client"})
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": client})

}

func CreateClient(c *fiber.Ctx) error {
	newClient := &models.Client{}

	//Parse the body
	if err := c.BodyParser(newClient); err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Invalid input", err)
	}

	//Create Client
	err := repositories.CreateClient(newClient)
	fmt.Println("Error: ", err)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), nil)
	}

	//Generate token
	fmt.Println("newClient: ", newClient)
	token, err := helpers.GenerateToken(newClient.ID, newClient.Email)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Failed to generate token", err)
	}

	//create map string interface
	response := map[string]interface{}{"token": token, "lawyer": newClient}
	return helpers.SendResponse(c, fiber.StatusCreated, "Client Created Successfully", response)
}
