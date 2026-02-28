import { check, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Enter your email")
    .isEmail()
    .withMessage("Invalid email"),

  check("password")
    .notEmpty()
    .withMessage("Enter your password")
    .isLength({ min: 8, max: 64 })
    .withMessage("Password length must be between 8 and 64 characters"),
];

const registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("Enter your name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name length must be between 2 and 50 characters"),

  check("email")
    .notEmpty()
    .withMessage("Enter your email")
    .isEmail()
    .withMessage("Invalid email"),

  check("password")
    .notEmpty()
    .withMessage("Enter your password")
    .isLength({ min: 8, max: 64 })
    .withMessage("Password length must be between 8 and 64 characters"),
];

const pdfValidator = check("task").custom((value, { req }) => {
  if (req.file) return true;
  throw new Error("please, upload the task");
});

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.array(),
    });
  }
  next();
};

export { loginValidator, registerValidator, pdfValidator, validate };
