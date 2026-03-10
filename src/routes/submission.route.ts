import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  getSubmissions,
  gradeSubmission,
  getGrades,
} from "../controllers/submission.controller.js";

const router = Router();

/**
 * @openapi
 * /api/submissions:
 *   get:
 *     summary: Get all submissions (Admin)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     submissions:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.route("/").get(isAuth, isAdmin, getSubmissions);

/**
 * @openapi
 * /api/submissions/grades:
 *   get:
 *     summary: Get my grades (Authenticated user)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of grades for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     grades:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Unauthorized
 */
router.route("/grades").get(isAuth, getGrades);

/**
 * @openapi
 * /api/submissions/grade/{submissionId}:
 *   post:
 *     summary: Grade a submission (Admin)
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The submission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [grade]
 *             properties:
 *               grade:
 *                 type: number
 *                 example: 95
 *               feedback:
 *                 type: string
 *                 example: "Good work"
 *     responses:
 *       201:
 *         description: Grade created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     gradeId:
 *                       type: string
 *                       example: "65f0c2a2d9b3b2c7c8d7e999"
 *                     submissionId:
 *                       type: string
 *                       example: "65f0c2a2d9b3b2c7c8d7e123"
 *                     grade:
 *                       type: number
 *                       example: 95
 *                     feedback:
 *                       type: string
 *                       example: "Good work"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       404:
 *         description: Submission not found
 */
router.route("/grade/:submissionId").post(isAuth, isAdmin, gradeSubmission);

export default router;
