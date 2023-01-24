package repositories

import (
	"errors"

	"github.com/Practicum-1/lawyer-client-backend.git/db"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"gorm.io/gorm"
)

func GetAllCourts() ([]models.Court, error) {
	db := db.GetDB()
	var court []models.Court
	result := db.Find(&court)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, errors.New("404")
	}
	if result.Error != nil {
		return nil, result.Error
	}
	return court, nil
}

func GetAllLanguages() ([]models.Language, error) {
	db := db.GetDB()
	var language []models.Language
	result := db.Find(&language)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, errors.New("404")
	}
	if result.Error != nil {
		return nil, result.Error
	}
	return language, nil
}

func GetAllPracticeAreas() ([]models.PracticeArea, error) {
	db := db.GetDB()
	var practiceArea []models.PracticeArea
	result := db.Find(&practiceArea)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, errors.New("404")
	}
	if result.Error != nil {
		return nil, result.Error
	}
	return practiceArea, nil
}
func GetAllLocations() ([]models.Location, error) {
	db := db.GetDB()
	var location []models.Location
	result := db.Find(&location)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, errors.New("404")
	}
	if result.Error != nil {
		return nil, result.Error
	}
	return location, nil
}
