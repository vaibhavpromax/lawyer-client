package seeds

import "github.com/Practicum-1/lawyer-client-backend.git/models"

func SeedClients() {
	var count int64
	DB.Model(&models.Client{}).Count(&count)
	if count == 0 {
		DB.Model(&models.Client{}).Create(clients)
	}
}

var clients = []models.Client{
	{
		FirstName:  "Jason",
		LastName:   "Voorhees",
		LocationID: 2,
		Email:      "jason@gmail.com",
		Phone:      "+912",
		Password:   "client123"},
	{
		FirstName:  "Scorpian",
		LastName:   "Vade",
		LocationID: 3,
		Email:      "scorpian@gmail.com",
		Phone:      "+911",
		Password:   "client123"},
	{
		FirstName:  "Miranda",
		LastName:   "Jones",
		LocationID: 4,
		Email:      "miranda@gmail.com",
		Phone:      "+912",
		Password:   "client123"},
}
