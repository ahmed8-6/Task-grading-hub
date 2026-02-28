import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getSubmissions,
  gradeSubmission,
  getGrades,
} from "../controllers/submission.controller.js";

const router = Router();

router.route("/").get(isAuth, isAdmin, getSubmissions);
router.route("/grades").get(isAuth, getGrades);
router.route("/grade/:submissionId").post(isAuth, isAdmin, gradeSubmission);

export default router;
