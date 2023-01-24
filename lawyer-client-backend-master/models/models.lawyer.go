package models

import (
	"errors"
	"time"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"gorm.io/gorm"
)

type Lawyer struct {
	ID            uint                 `gorm:"primaryKey" json:"id"`
	FirstName     string               `gorm:"type:varchar(100) not null" json:"first_name"`
	LastName      string               `gorm:"type:varchar(100) not null" json:"last_name"`
	FullName      string               `gorm:"->;type:text GENERATED ALWAYS AS (concat(first_name,' ',last_name)) VIRTUAL;" json:"full_name"`
	LocationID    uint                 `gorm:"not null" json:"location_id"`
	Location      *Location            `gorm:"foreignKey:location_id" json:"location"`
	Email         string               `gorm:"unique;not null" json:"email"`
	Phone         string               `gorm:"type:varchar(100);not null" json:"phone"`
	Password      string               `gorm:"type:varchar(100);not null" json:"password"`
	ImageURL      string               `gorm:"type:text" json:"image_url"`
	Education     string               `gorm:"not null" json:"education"`
	Experience    uint                 `gorm:"not null" json:"experience"`
	Verified      bool                 `gorm:"not null" json:"verified"`
	Gender        string               `gorm:"not null" json:"gender"`
	Rating        uint                 `json:"rating"`
	Reviews       []Review             `gorm:"foreignKey:LawyerID" json:"reviews"`
	Courts        []Court              `gorm:"many2many:lawyer_courts" json:"courts"`
	Languages     []Language           `gorm:"many2many:lawyer_languages" json:"languages"`
	PracticeAreas []LawyerPracticeArea `gorm:"foreignKey:LawyerID" json:"practice_areas"`
	// PendingRequests []Request            `gorm:"foreignKey:LawyerID;check: request.status = 'pending'" json:"pending_requests"` //just for testing
	Requests []Request `gorm:"foreignKey:LawyerID" json:"requests"`
	// ConnectedClients []LawyerClient       `gorm:"foreignKey:LawyerID" json:"connected_lawyers"`
	CreatedAt time.Time `gorm:"" json:"created_at"`
	UpdatedAt time.Time `gorm:"" json:"updated_at"`
}

func (client *Lawyer) BeforeCreate(tx *gorm.DB) error { //Validate the client before creating it
	var count int64
	tx.Model(&client).Where("email = ? OR phone = ?", client.Email, client.Phone).Count(&count)
	if count != 0 {
		return errors.New("lawyer already exists with this email or phone number")
	}
	hashedPassword, err := helpers.HashPassword(client.Password)
	if err != nil {
		return err
	}
	client.Password = hashedPassword
	return nil
}
