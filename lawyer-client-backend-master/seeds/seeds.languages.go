package seeds

import (
	"github.com/Practicum-1/lawyer-client-backend.git/models"
)

func SeedLanguages() {
	var count int64
	DB.Model(&models.Language{}).Count(&count)
	if count == 0 {
		DB.Model(&models.Language{}).Create(languages)
	}
}

var languages []models.Language = []models.Language{
	{Name: "Assamese"},
	{Name: "Bengali"},
	{Name: "Bodo"},
	{Name: "Dogri"},
	{Name: "English"},
	{Name: "Hindi"},
	{Name: "Kannada"},
	{Name: "Kashmiri"},
	{Name: "Konkani"},
	{Name: "Maithili"},
	{Name: "Malayalam"},
	{Name: "Manipuri"},
	{Name: "Marathi"},
	{Name: "Nepali"},
	{Name: "Oriya"},
	{Name: "Punjabi"},
	{Name: "Sanskrit"},
	{Name: "Santali"},
	{Name: "Sindhi"},
	{Name: "Tamil"},
	{Name: "Telgu"},
	{Name: "Urdu"},
}
