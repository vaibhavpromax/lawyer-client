package controllers

import (
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
)

func GetAllLawyer(c *fiber.Ctx) error {

	lawyer, err := repositories.GetAllLawyers()
	if err != nil {
		if err.Error() == "404" {
			return helpers.SendResponse(c, fiber.StatusNotFound, "No lawyer found", nil)
		} else {
			return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
		}
	}
	return helpers.SendResponse(c, fiber.StatusOK, "success", lawyer)
}

func GetLawyerById(c *fiber.Ctx) error {

	id, err := strconv.ParseUint(c.Params("id"), 10, 32)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Invalid Id", err)
	}

	var lawyer models.Lawyer
	err = repositories.GetLawyerById(id, &lawyer)
	if err != nil {
		if err.Error() == "404" {
			return helpers.SendResponse(c, fiber.StatusNotFound, "Lawyer not found", nil)
		} else {
			return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
		}
	}
	return helpers.SendResponse(c, fiber.StatusOK, "success", lawyer)

}

func CreateLawyer(c *fiber.Ctx) error {
	newLawyer := &models.Lawyer{}

	//Parse the body
	if err := c.BodyParser(newLawyer); err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Invalid input", err)
	}
	fmt.Println("newLawyer", newLawyer)
	//Create Client
	err := repositories.CreateLawyer(newLawyer)
	fmt.Println("Error: ", err)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), nil)
	}

	//Generate token
	fmt.Println("newClient: ", newLawyer)
	token, err := helpers.GenerateToken(newLawyer.ID, newLawyer.Email)
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusBadRequest, "Failed to generate token", err)
	}

	//create map string interface
	response := map[string]interface{}{"token": token, "lawyer": newLawyer}
	return helpers.SendResponse(c, fiber.StatusCreated, "Lawyer Created Successfully", response)
}

func GetLawyerByFilter(c *fiber.Ctx) error {
	//Parse the body
	//get query
	filters := make(map[string]string)
	filters["location_id"] = c.Query("location_id")
	filters["gender"] = c.Query("gender")
	filters["experience"] = c.Query("experience")
	filters["language_id"] = c.Query("language_id")
	filters["practice_area_id"] = c.Query("practice_area_id")
	filters["court_id"] = c.Query("court_id")

	fmt.Println(filters)
	//fiber map

	// filters.LocationID = uint(location_id)
	// filters.Gender = gender
	// filters.Experience = uint(experience)
	// filters.LanguageID = uint(language_id)
	// filters.PracticeAreaID = uint(practice_area_id)
	// filters.CourtID = uint(court_id)

	lawyers, _ := repositories.GetLawyerByFilter(filters)

	// if err != nil {
	// 	if err.Error() == "404" {
	// 		return helpers.SendResponse(c, fiber.StatusNotFound, "Lawyer not found", nil)
	// 	} else {
	// 		return helpers.SendResponse(c, fiber.StatusBadRequest, err.Error(), err)
	// 	}
	// }
	return helpers.SendResponse(c, fiber.StatusOK, "success", lawyers)
}
