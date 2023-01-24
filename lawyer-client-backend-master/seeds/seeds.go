package seeds

import (
	"fmt"

	"github.com/Practicum-1/lawyer-client-backend.git/models"
	"gorm.io/gorm"
)

var DB *gorm.DB

func RunSeeds() {
	defer fmt.Println("Seeds completed")
	DB = models.DB
	SeedCourts()
	SeedLanguages()
	SeedPracticeArea()
	SeedLocations()
	SeedClients()
	SeedLawyer()
}
