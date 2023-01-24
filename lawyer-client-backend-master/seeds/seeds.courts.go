package seeds

import (
	"github.com/Practicum-1/lawyer-client-backend.git/models"
)

func SeedCourts() {
	var count int64
	DB.Model(&models.Court{}).Count(&count)
	if count == 0 {
		DB.Model(&models.Court{}).Create(courts)
	}
}

var courts []models.Court = []models.Court{
	{Name: "Allaahbad High Court",
		Type: "High Court", Location: "Lucknow"},
	{Name: "Andhra Pradesh High Court",
		Type: "High Court", Location: "Amrawati"},
	{Name: "Bombay High Court",
		Type: "High Court", Location: "Mumbai"},
	{Name: "Calcutta High Court",
		Type: "High Court", Location: "Kolkata"},
	{Name: "Chhattisgarh High Court",
		Type: "High Court", Location: "Bilaspur"},
	{Name: "Delhi High Court",
		Type: "High Court", Location: "Delhi"},
	{Name: "Gauhati High Court",
		Type: "High Court", Location: "Guwahati"},
	{Name: "Gujarat High Court",
		Type: "High Court", Location: "Ahmedabad"},
	{Name: "Himachal High Court",
		Type: "High Court", Location: "Ravenswood"},
	{Name: "Jammu & Kashmir High Court",
		Type: "High Court", Location: "Srinagar"},
	{Name: "Jharkhand High Court",
		Type: "High Court", Location: "Ranchi"},
	{Name: "Karnataka High Court",
		Type: "High Court", Location: "Bengaluru"},
	{Name: "Kerala High Court",
		Type: "High Court", Location: "Kochi"},
	{Name: "Madhya Pradesh High Court",
		Type: "High Court", Location: "Jabalpur"},
	{Name: "Madras High Court",
		Type: "High Court", Location: "Chennai"},
	{Name: "Manipur High Court",
		Type: "High Court", Location: "Imphal"},
	{Name: "Meghalaya High Court",
		Type: "High Court", Location: "Shillong"},
	{Name: "Orrisa High Court",
		Type: "High Court", Location: "Cuttack"},
	{Name: "Patna High Court",
		Type: "High Court", Location: "Patna"},
	{Name: "Punjab and Haryana High Court",
		Type: "High Court", Location: "Chandigarh"},
	{Name: "Rajasthan High Court",
		Type: "High Court", Location: "Jodhpur"},
	{Name: "Sikkim High Court",
		Type: "High Court", Location: "Gangtok"},
	{Name: "Telangana High Court",
		Type: "High Court", Location: "Hyderabad"},
	{Name: "Tripura High Court",
		Type: "High Court", Location: "Agartala"},
	{Name: "Uttarakhand High Court", Type: "High Court", Location: "Nainital"}}
