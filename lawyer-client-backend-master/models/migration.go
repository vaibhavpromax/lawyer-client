package models

import (
	"fmt"

	database "github.com/Practicum-1/lawyer-client-backend.git/db"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Migrate() {
	db := database.GetDB()
	DB = db
	defer fmt.Println("Migration complete")
	// defer db.Migrator().DropTable(&Lawyer{}, &Client{}, &Review{}, &Court{}, &Language{}, &PracticeArea{}, "lawyer_courts", "lawyer_languages", "lawyer_practice-areas", &Request{})
	DB.AutoMigrate(&Court{}, &PracticeArea{}, &Language{}, &Location{}, &Client{}, &Lawyer{}, &LawyerClient{}, &Chat{}, &LawyerPracticeArea{}, &Request{}, &Review{}) // Migrate the Book table.
}
