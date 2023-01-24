package seeds

import "github.com/Practicum-1/lawyer-client-backend.git/models"

func SeedLawyer() {
	var count int64
	DB.Model(&models.Lawyer{}).Count(&count)
	if count == 0 {
		DB.Model(&models.Lawyer{}).Create(lawyer)
	}
}

var lawyer = []models.Lawyer{
	{
		FirstName:  "Alie",
		LastName:   "Voorhees",
		LocationID: 4,
		Email:      "alie@gmail.com",
		Phone:      "+912211",
		Password:   "lawyer123",
		Gender:     "female",
		Rating:     0,
		Education:  "LLM",
		Experience: 5,
		Languages: []models.Language{
			{ID: 1},
			{ID: 3},
			{ID: 5},
		},
		Courts: []models.Court{
			{ID: 3},
			{ID: 5},
			{ID: 10},
			{ID: 23},
		},
		PracticeAreas: []models.LawyerPracticeArea{
			{PracticeAreaID: 1},
			{PracticeAreaID: 2},
			{PracticeAreaID: 31},
			{PracticeAreaID: 37},
		},
	},
	{
		FirstName:  "Lian",
		LastName:   "Vade",
		LocationID: 7,
		Email:      "lian@gmail.com",
		Phone:      "+911123123",
		Password:   "lawyer123",
		Gender:     "male",
		Rating:     0,
		Education:  "LLB",
		Experience: 10,
		Languages: []models.Language{
			{ID: 1},
			{ID: 21},
			{ID: 19},
		},
		Courts: []models.Court{
			{ID: 6},
			{ID: 8},
			{ID: 13},
			{ID: 18},
		},
		PracticeAreas: []models.LawyerPracticeArea{
			{PracticeAreaID: 2},
			{PracticeAreaID: 3},
			{PracticeAreaID: 4},
			{PracticeAreaID: 5},
			{PracticeAreaID: 11},
			{PracticeAreaID: 14},
			{PracticeAreaID: 16},
			{PracticeAreaID: 18},
			{PracticeAreaID: 21},
			{PracticeAreaID: 24},
			{PracticeAreaID: 26},
			{PracticeAreaID: 30},
			{PracticeAreaID: 31},
			{PracticeAreaID: 32},
			{PracticeAreaID: 33},
		},
	},
	{
		FirstName:  "John",
		LastName:   "Jones",
		LocationID: 8,
		Email:      "john@gmail.com",
		Phone:      "+912321321",
		Password:   "lawyer123",
		Gender:     "female",
		Rating:     0,
		Education:  "Integrated LLB",
		Experience: 12,
		Languages: []models.Language{
			{ID: 17},
			{ID: 13},
			{ID: 14},
		},
		Courts: []models.Court{
			{ID: 4},
			{ID: 7},
			{ID: 13},
			{ID: 25},
		},
		PracticeAreas: []models.LawyerPracticeArea{
			{PracticeAreaID: 3},
			{PracticeAreaID: 5},
			{PracticeAreaID: 8},
			{PracticeAreaID: 12},
			{PracticeAreaID: 13},
			{PracticeAreaID: 15},
			{PracticeAreaID: 16},
			{PracticeAreaID: 17},
			{PracticeAreaID: 18},
			{PracticeAreaID: 21},
			{PracticeAreaID: 23},
			{PracticeAreaID: 32},
			{PracticeAreaID: 33},
			{PracticeAreaID: 35},
			{PracticeAreaID: 36},
		},
	},
}
