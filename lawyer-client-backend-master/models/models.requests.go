package models

import (
	"errors"
	"fmt"
	"time"

	"github.com/Practicum-1/lawyer-client-backend.git/helpers"
	"gorm.io/gorm"
)

type RequestData struct {
	Title           string `gorm:"not null" json:"title"`
	Body            string `json:"body"`
	DenyWithMessage string `json:"deny_with_message"`
}

type Request struct {
	ID          uint        `gorm:"primaryKey" json:"id"`
	LawyerID    uint        `gorm:"not null" json:"lawyer_id"`
	Lawyer      *Lawyer     `gorm:"foreignKey:LawyerID" json:"lawyer"`
	ClientID    uint        `gorm:"not null" json:"client_id"`
	Client      *Client     `gorm:"foreignKey:ClientID" json:"client"`
	RequestData RequestData `gorm:"embedded" json:"request_data"`
	Status      string      `gorm:"not null" json:"status"`
	CreatedAt   time.Time   `gorm:"" json:"created_at"`
	UpdatedAt   time.Time   `gorm:"" json:"updated_at"`
}

func (request *Request) BeforeCreate(tx *gorm.DB) error { //Validate the client before creating it
	if request.RequestData.Title != "" {
		request.Status = helpers.ENUM_REQUEST_STATUS["PENDING"]
		return nil
	}
	fmt.Println("Request title is empty")
	return errors.New("no Title Found")
}
