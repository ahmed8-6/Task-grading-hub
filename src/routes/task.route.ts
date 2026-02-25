import { Router } from "express";
import { addTask } from "../controllers/task.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.route("/add").post(isAuth, isAdmin, addTask);

export default router;
