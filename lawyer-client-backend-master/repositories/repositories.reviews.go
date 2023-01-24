package repositories

import (
	"errors"

	"github.com/Practicum-1/lawyer-client-backend.git/db"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func GetReviewByLawyerID(id string) (*[]models.Review, error) {
	db := db.GetDB()
	reviews := &[]models.Review{}
	if err := db.Preload("Client").Omit("Lawyer").Where("lawyer_id = ?", id).Find(&reviews).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("404")
		}
		return nil, err
	}
	return reviews, nil
}

func GetReviewByClientID(id string) (*[]models.Review, error) {
	db := db.GetDB()
	reviews := &[]models.Review{}
	if err := db.Preload("Lawyer").Where("client_id = ?", id).Find(&reviews).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("404")
		}
		return nil, err
	}
	return reviews, nil
}

func GetAllReviews() ([]models.Review, error) {
	db := db.GetDB()
	var reviews []models.Review
	result := db.Preload(clause.Associations).Preload("Lawyer").Preload("Client").Find(&reviews)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, errors.New("404")
	}
	if result.Error != nil {
		return nil, result.Error
	}
	return reviews, nil
}

func CreateReview(review *models.Review) error {
	db := db.GetDB()
	if result := db.Create(&review); result.Error != nil {
		return result.Error
	}
	return nil
}
