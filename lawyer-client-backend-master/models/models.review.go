package models

import (
	"errors"
	"fmt"
	"time"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"gorm.io/gorm"
)

type Review struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	LawyerID    uint      `gorm:"not null" json:"lawyer_id"`
	Lawyer      *Lawyer   `gorm:"foreignKey:LawyerID" json:"lawyer"`
	ClientID    uint      `gorm:"not null" json:"client_id"`
	Client      *Client   `gorm:"foreignKey:ClientID" json:"client"`
	Description string    `gorm:"" json:"description"`
	Rating      uint      `gorm:"" json:"rating"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (review *Review) BeforeCreate(tx *gorm.DB) error {
	var count int64
	if review.ClientID == 0 || review.LawyerID == 0 || review.Rating == 0 || review.Description == "" {
		return errors.New("invalid request payload")
	}
	fmt.Println("review in pre creation custom hook")
	helpers.PrettyPrint(review)
	DB.Model(&review).Where("lawyer_id = ? AND client_id = ?", review.LawyerID, review.ClientID).Count(&count)
	if count != 0 {
		return errors.New("review already exists for this lawyer and client")
	}
	fmt.Println("pre create custom hook over")
	return nil
}

//afterCreate hook
func (review *Review) AfterCreate(tx *gorm.DB) error {
	//update lawyer rating
	lawyer := &Lawyer{}
	tx.Model(&Lawyer{}).Where("id = ?", review.LawyerID).First(&lawyer)
	fmt.Println("lawyer in after create custom hook")
	helpers.PrettyPrint(lawyer)
	if lawyer.Rating == 0 {
		lawyer.Rating = review.Rating
	} else {
		lawyer.Rating = (lawyer.Rating + review.Rating) / 2
	}
	fmt.Println("lawyer rating changed to", lawyer.Rating)
	tx.Save(&lawyer)
	return nil
}
