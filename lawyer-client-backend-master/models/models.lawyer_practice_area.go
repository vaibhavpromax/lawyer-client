package models

import "time"

type LawyerPracticeArea struct {
	ID       uint `gorm:"primaryKey" json:"lawyer_practice_area_id"`
	LawyerID uint `gorm:"not null" json:"lawyer_id"`
	// Lawyer         Lawyer       `gorm:"foreignKey:LawyerID" json:"lawyer"`
	PracticeAreaID uint          `gorm:"not null" json:"practice_area_id"`
	PracticeArea   *PracticeArea `gorm:"foreignKey:PracticeAreaID" json:"practice_area"`
	Charge         int           `gorm:"" json:"charge"`
	CreatedAt      time.Time     `json:"created_at"`
	UpdatedAt      time.Time     `json:"updated_at"`
}
