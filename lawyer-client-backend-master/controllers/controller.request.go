package controllers

import (
	"fmt"
	"strconv"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
	"github.com/gofiber/fiber/v2"
)

func GetRequest(c *fiber.Ctx) error {
	id := c.Params("id")
	request, err := repositories.GetRequestById(id)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusNotFound, "unable to get request", nil)
	}
	return helpers.SendResponse(c, fiber.StatusOK, "request found", request)
}

func CreateRequest(c *fiber.Ctx) error {
	request := &models.Request{}
	err := c.BodyParser(&request)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "invalid input", nil)
	}
	headers := c.GetReqHeaders()
	client_id := headers["Id"]
	//convert string to uint
	client_id_uint, err := strconv.ParseUint(client_id, 10, 32)
	// request.ClientID =
	request.ClientID = uint(client_id_uint)
	helpers.PrettyPrint(request)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Parsing Issue", nil)
	}
	err = repositories.CreateRequest(request)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "unable to create request", nil)
	}
	return helpers.SendResponse(c, fiber.StatusCreated, "request created", request)
}

func DeleteRequest(c *fiber.Ctx) error {
	id := c.Params("id")
	err := repositories.DeleteRequestById(id)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "unable to delete request", nil)
	}
	return helpers.SendResponse(c, fiber.StatusOK, "request deleted", nil)
}

func ChangeRequestStatus(c *fiber.Ctx) error {
	status := c.Params("status")
	id := c.Params("id")
	if status == helpers.ENUM_REQUEST_STATUS["APPROVE"] || status == helpers.ENUM_REQUEST_STATUS["DENY"] {
		err := repositories.SetRequestStatus(id, status)
		if err != nil {
			return helpers.SendResponse(c, fiber.StatusBadRequest, "unable to change request status", nil)
		}
		return helpers.SendResponse(c, fiber.StatusOK, fmt.Sprintf("Request Status changed to %s for %s", status, id), nil)
	}
	return helpers.SendResponse(c, fiber.StatusBadRequest, "invalid status", nil)
}

func UpdateRequest(c *fiber.Ctx) error {
	id := c.Params("id")
	request := &models.Request{}
	err := c.BodyParser(&request)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "invalid input", nil)
	}
	err = repositories.UpdateRequest(id, request)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "unable to update request", nil)
	}
	return helpers.SendResponse(c, fiber.StatusOK, "request updated", nil)
}
