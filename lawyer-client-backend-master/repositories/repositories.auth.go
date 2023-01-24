package repositories

import (
	"errors"

	"github.com/Practicum-1/lawyer-client-backend.git/db"
	"gorm.io/gorm"
)

func GetUserByEmail(model interface{}, e string) error {
	db := db.GetDB()

	if err := db.Where("email = ?", e).First(&model).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("404")
		}
		return err
	}
	return nil
}
