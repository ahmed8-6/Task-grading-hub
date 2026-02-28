import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
  validate,
} from "../middlewares/validators.js";
const router = Router();

router.route("/login").post(loginValidator, validate, login);
router.route("/register").post(registerValidator, validate, register);

export default router;
