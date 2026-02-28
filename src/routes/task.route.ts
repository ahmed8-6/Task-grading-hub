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
import { check } from "express-validator";

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

router.route("/").get(isAuth, getTasks);
router.route("/add").post(isAuth, isAdmin, addTask);
router.route("/submit/:taskId").post(
  isAuth,
  upload.single("task"),
  check("task").custom((value, { req }) => {
    if (req.file) return true;
    throw new Error("please, upload the task");
  }),
  submitTask,
);

export default router;
