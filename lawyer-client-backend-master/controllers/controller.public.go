package controllers

import (
	"github.com/Practicum-1/lawyer-client-backend.git/db"
	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"github.com/Practicum-1/lawyer-client-backend.git/repositories"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm/clause"
)

func GetDashboardData(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"msg": "Client got"})
}

func GetSeededData(c *fiber.Ctx) error {
	response := make(map[string]interface{})

	courts, err := repositories.GetAllCourts()
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusInternalServerError, err.Error(), nil)
	}
	//loop on courts
	parseCourts := make(map[uint]interface{})
	for _, court := range courts {
		parseCourts[court.ID] = court.Name
	}
	response["courts"] = parseCourts

	languages, err := repositories.GetAllLanguages()
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusInternalServerError, err.Error(), nil)
	}
	//loop on languages
	parseLanguages := make(map[uint]interface{})
	for _, language := range languages {
		parseLanguages[language.ID] = language.Name
	}
	response["languages"] = parseLanguages

	practiceAreas, err := repositories.GetAllPracticeAreas()
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusInternalServerError, err.Error(), nil)
	}
	//loop on practice areas
	parsePracticeAreas := make(map[uint]interface{})
	for _, practiceArea := range practiceAreas {
		parsePracticeAreas[practiceArea.ID] = practiceArea.Name
	}
	response["practice_areas"] = parsePracticeAreas
	location, err := repositories.GetAllLocations()
	if err != nil {
		return helpers.SendResponse(c, fiber.StatusInternalServerError, err.Error(), nil)
	}
	//loop on locations
	parseCities := make(map[uint]interface{})

	for _, loc := range location {
		parseCities[loc.ID] = loc.City
	}
	response["cities"] = parseCities

	return helpers.SendResponse(c, fiber.StatusOK, "Judiciary Data Fetched", response)
}

func Test(c *fiber.Ctx) error {
	db := db.GetDB()
	var result []models.LawyerPracticeArea
	db.Model(&models.LawyerPracticeArea{}).Preload(clause.Associations).Find(&result)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"test": result})
}
