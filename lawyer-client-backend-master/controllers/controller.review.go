package controllers

import (
	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
	"github.com/gofiber/fiber/v2"
)

func GetReviewsByLawyerID(c *fiber.Ctx) error {
	id := c.Params("id")
	review, err := repositories.GetReviewByLawyerID(id)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), nil)
	}
	return helpers.SendResponse(c, fiber.StatusOK, "reviews of lawyer fetched", review)
}

func GetReviewsByClientID(c *fiber.Ctx) error {
	id := c.Params("id")
	review, err := repositories.GetReviewByClientID(id)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), nil)
	}
	return helpers.SendResponse(c, fiber.StatusOK, "reviews of client fetched", review)
}

func CreateReview(c *fiber.Ctx) error {
	review := &models.Review{}

	//get client id from token
	client_id := c.GetReqHeaders()["Id"]
	//convert string to uint
	client_id_uint, err := helpers.StringToUint(client_id)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusInternalServerError, err.Error(), nil)
	}
	review.ClientID = client_id_uint

	if err := c.BodyParser(&review); err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), nil)
	}
	helpers.PrettyPrint(review)
	if err := repositories.CreateReview(review); err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), nil)
	}
	return helpers.SendResponse(c, fiber.StatusCreated, "review created", nil)
}
