import { Router } from "express";
import {
  getTasks,
  addTask,
  submitTask,
} from "../controllers/task.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";
import multer from "multer";
import { pdfValidator, validate } from "../middlewares/validators.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./submissions/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = function (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format, upload a pdf format file"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const router = Router();

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Get available tasks (deadline not passed)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
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
 *                     tasks:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(isAuth, getTasks);

/**
 * @openapi
 * /api/tasks/add:
 *   post:
 *     summary: Add a new task (Admin)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Assignment 1"
 *     responses:
 *       201:
 *         description: Task created
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
 *                     taskId:
 *                       type: string
 *                       example: "65f0c2a2d9b3b2c7c8d7e111"
 *                     title:
 *                       type: string
 *                       example: "Assignment 1"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */
router.route("/add").post(isAuth, isAdmin, addTask);

/**
 * @openapi
 * /api/tasks/submit/{taskId}:
 *   post:
 *     summary: Submit a task solution as PDF
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [task]
 *             properties:
 *               task:
 *                 type: string
 *                 format: binary
 *                 description: PDF file to upload (field name must be 'task')
 *     responses:
 *       201:
 *         description: Submission created
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
 *                     submissionId:
 *                       type: string
 *                       example: "65f0c2a2d9b3b2c7c8d7e222"
 *                     taskId:
 *                       type: string
 *                       example: "65f0c2a2d9b3b2c7c8d7e111"
 *                     userId:
 *                       type: string
 *                       example: "65f0c2a2d9b3b2c7c8d7e333"
 *                     submissionPath:
 *                       type: string
 *                       example: "submission/1710000000-myfile.pdf"
 *       400:
 *         description: Validation error / deadline passed / invalid file
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router
  .route("/submit/:taskId")
  .post(isAuth, upload.single("task"), pdfValidator, validate, submitTask);

export default router;
