package controllers

import (
	"fmt"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
	"github.com/gofiber/fiber/v2"
)

func GetAllLawyersByClientID(c *fiber.Ctx) error {
	id := c.Params("id")
	var lawyers []models.LawyerClient
	lawyers, err := repositories.GetAllLawyersByClientID(id)
	if err != nil {
		if err.Error() == "404" {
			return helpers.SendResponse(c, fiber.StatusNotFound, "No lawyer found", nil)
		} else {
			return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
		}
	}

	return helpers.SendResponse(c, fiber.StatusOK, "success", lawyers)
}

func GetAllClientsByLawyerID(c *fiber.Ctx) error {
	id := c.Params("id")
	var clients []models.LawyerClient
	clients, err := repositories.GetAllClientsByLawyerID(id)
	if err != nil {
		if err.Error() == "404" {
			return helpers.SendResponse(c, fiber.StatusNotFound, "No lawyer found", nil)
		} else {
			return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
		}
	}

	return helpers.SendResponse(c, fiber.StatusOK, "success", clients)
}

func CreateChat(c *fiber.Ctx) error {
	newChat := &models.Chat{}

	//Parse the body
	if err := c.BodyParser(newChat); err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Invalid input", err)
	}

	//Create Client
	err := repositories.CreateChat(newChat)
	fmt.Println("Error: ", err)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), nil)
	}

	return helpers.SendResponse(c, fiber.StatusOK, "success", newChat)
}

func GetLawyerClientChat(c *fiber.Ctx) error {
	id := c.Params("id")
	var chats []models.Chat
	chats, err := repositories.GetLawyerClientChat(id)
	if err != nil {
		if err.Error() == "404" {
			return helpers.SendResponse(c, fiber.StatusNotFound, "No chat found", nil)
		} else {
			return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
		}
	}

	return helpers.SendResponse(c, fiber.StatusOK, "success", chats)
}
