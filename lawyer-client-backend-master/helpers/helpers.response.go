package helpers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func SendResponse(c *fiber.Ctx, status int, msg string, data interface{}) error {
	err := c.Status(status).JSON(fiber.Map{"msg": msg, "data": data})
	if err != nil {
		fmt.Println("Error in SendResponse: ", err)
		return err
	}
	return nil
}

// Send response takes 4 parameters
// c: context
// status: status code ex -> fiber.StatusOK, fiber.StatusCreated, fiber.StatusNoContent
// msg: message to be sent
// data: data to be sent -> in form of map, array, string, int, float, bool i.e interface
// returns error if json marshalling fails
