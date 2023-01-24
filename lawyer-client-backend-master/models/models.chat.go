package models

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Chat struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	LawyerClientID uint      `gorm:"not null" json:"lawyer_client_id"`
	Message        string    `gorm:"not null" json:"message"`
	SentByLawyer   bool      `gorm:"not null" json:"sent_by_lawyer"`
	ReplyToID      uint      `gorm:"default:null" json:"reply_to_id"`
	RepliedTo      *Chat     `gorm:"foreignKey:ReplyToID" json:"replied_to"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func (c *Chat) BeforeCreate(tx *gorm.DB) error {
	if c.LawyerClientID == 0 || c.Message == "" {
		return errors.New("missing request payload")
	}

	return nil
}
