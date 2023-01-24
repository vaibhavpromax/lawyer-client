package controllers

import (
	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
	"github.com/gofiber/fiber/v2"
)

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"` //either  lawyer or client
}

func UserLogin(c *fiber.Ctx) error {
	var input LoginInput

	//Parse the body
	if err := c.BodyParser(&input); err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Invalid input", err)
	}
	var response interface{}
	var err error

	if !(input.Role == helpers.ENUM_ROLE_TYPE["LAWYER"] || input.Role == helpers.ENUM_ROLE_TYPE["CLIENT"]) {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Invalid role", nil)
	}

	if input.Role == helpers.ENUM_ROLE_TYPE["LAWYER"] {
		response, err = lawyerLogin(input)
	} else {
		response, err = clientLogin(input)
	}
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
	}

	return helpers.SendResponse(c, fiber.StatusCreated, "Successfully Logged in", response)

}

func lawyerLogin(input LoginInput) (map[string]interface{}, error) {
	var lawyer models.Lawyer
	err := repositories.GetUserByEmail(&lawyer, input.Email)
	if err != nil {
		return nil, err
	}
	token, err := helpers.GenerateToken(lawyer.ID, lawyer.Email)
	if err != nil {
		return nil, err
	}
	response := map[string]interface{}{"token": token, "lawyer": lawyer}
	return response, nil
}

func clientLogin(input LoginInput) (map[string]interface{}, error) {
	var client models.Client
	err := repositories.GetUserByEmail(&client, input.Email)
	if err != nil {
		return nil, err
	}
	token, err := helpers.GenerateToken(client.ID, client.Email)
	if err != nil {
		return nil, err
	}
	response := map[string]interface{}{"token": token, "client": client}
	return response, nil
}
