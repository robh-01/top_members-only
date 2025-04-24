import { body } from "express-validator";

export const messageValidations = [
  body("message")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Message must between 2 to 50 characters long."),
];
