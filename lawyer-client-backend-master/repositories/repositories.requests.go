package repositories

import (
	"errors"
	"fmt"

	"github.com/Practicum-1/lawyer-client-backend.git/db"
	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func CreateRequest(request *models.Request) error {
	db := db.GetDB()
	result := db.Model(&models.Request{}).Create(request)
	if result.Error != nil {
		helpers.PrettyPrint(result.Error)
		return result.Error
	} else {
		return nil
	}
}

func GetRequestById(id interface{}) (*models.Request, error) {
	db := db.GetDB()
	var request *models.Request
	result := db.Model(&models.Request{}).Preload(clause.Associations).Where("id = ?", id).First(&request)
	helpers.PrettyPrint(result)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, errors.New("404")
	} else if result.Error != nil {
		return nil, result.Error
	} else {
		return request, nil
	}
}

func DeleteRequestById(id interface{}) error {
	db := db.GetDB()
	result := db.Model(models.Request{}).Delete("id = ?", id)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func SetRequestStatus(id interface{}, status string) error {
	db := db.GetDB()
	var request *models.Request
	result := db.Where("id = ?", id).Where("id = ? ", id).Find(&request)
	if result.Error != nil {
		return result.Error
	}
	request.Status = status
	if status == "approve" {
		fmt.Println("Ran")
		err := CreateLawyerClientConnection(request.LawyerID, request.ClientID)
		if err != nil {
			return err
		}
	}
	result = db.Save(request)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func UpdateRequest(id interface{}, request *models.Request) error {
	db := db.GetDB()
	result := db.Where("id = ? ", id).Updates(request)
	if result.Error != nil {
		return result.Error
	}
	if result.Error != nil {
		return result.Error
	}
	return nil
}
