import { body } from "express-validator";

const validateUsername = [
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters long.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username can only contain alphanumeric characters and underscores."
    ),
];

const validatePassword = [
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/^(?=.*[a-z])/) // at least one lowercase
    .withMessage("Password must include at least one lowercase letter")
    .matches(/^(?=.*[A-Z])/) // at least one uppercase
    .withMessage("Password must include at least one uppercase letter")
    .matches(/^(?=.*[0-9])/) // at least one number
    .withMessage("Password must include at least one number")
    .matches(/^(?=.*[!@#$%^&*])/) // at least one special char
    .withMessage("Password must include at least one special character (!@#$%^&*)")
];

const validateEmail = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .normalizeEmail(), // Sanitize email by removing unnecessary characters and standardizing format
];

const validateFirstName = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required.")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be between 1 and 50 characters long.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage(
      "First name can only contain alphabetic characters and spaces."
    ),
];

const validateLastName = [
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required.")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be between 1 and 50 characters long.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage(
      "Last name can only contain alphabetic characters and spaces."
    ),
];

// Combine all validation arrays into one for the signInPost route
export const userValidations = [
  ...validateFirstName,
  ...validateLastName,
  ...validateEmail,
  ...validateUsername,
  ...validatePassword,
];
