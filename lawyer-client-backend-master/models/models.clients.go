package models

import (
	"errors"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"gorm.io/gorm"
)

type Client struct {
	ID               uint           `gorm:"primaryKey" json:"client_id"`
	FirstName        string         `gorm:"type:varchar(100) not null" json:"first_name"`
	LastName         string         `gorm:"type:varchar(100) not null" json:"last_name"`
	FullName         string         `gorm:"->;type:text GENERATED ALWAYS AS (concat(first_name,' ',last_name)) VIRTUAL;" json:"full_name"`
	LocationID       uint           `gorm:"not null" json:"location_id"`
	Location         Location       `gorm:"foreignKey:location_id" json:"location"`
	Email            string         `gorm:"unique;not null" json:"email"`
	Phone            string         `gorm:"type:varchar(100);not null" json:"phone"`
	Password         string         `gorm:"type:varchar(100);not null" json:"password"`
	ImageURL         string         `gorm:"type:text" json:"image_url"`
	Reviews          []Review       `gorm:"foreignKey:ClientID" json:"reviews"`
	Requests         []Request      `gorm:"foreignKey:ClientID" json:"requests"`
	ConnectedLawyers []LawyerClient `gorm:"foreignKey:ClientID" json:"connected_lawyers"`
}

func (client *Client) BeforeCreate(tx *gorm.DB) error { //Validate the client before creating it
	var count int64
	tx.Model(&client).Where("email = ? OR phone = ?", client.Email, client.Phone).Count(&count)
	if count != 0 {
		return errors.New("user already exists with this email or phone number")
	}
	hashedPassword, err := helpers.HashPassword(client.Password)
	if err != nil {
		return err
	}
	client.Password = hashedPassword
	return nil
}
