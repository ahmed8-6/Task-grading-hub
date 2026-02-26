import type { Request, Response, NextFunction } from "express";
import { Task } from "../models/task.model.js";
import { Submission } from "../models/submission.model.js";
import { validationResult } from "express-validator";

const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const newTask = new Task({
      title,
    });
    await newTask.save();
    res.status(201).json({
      status: "success",
      data: {
        taskId: newTask._id,
        title: title,
      },
    });
  } catch (error) {
    next(error);
  }
};

const submitTask = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    return res.status(400).json({
      status: "fail",
      message: error?.msg,
    });
  }
  const userId = req.user?.userId;
  const taskId = req.params.taskId;
  const submissionPath = `submission/${req.file?.filename}`;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }
    if (new Date() > task.deadline) {
      return res.status(400).json({
        status: "fail",
        message: "Task deadline has passed",
      });
    }
    const newSubmission = new Submission({
      userId,
      taskId,
      submissionPath,
    });

    await newSubmission.save();
    res.status(201).json({
      status: "success",
      data: {
        submissionId: newSubmission._id,
        taskId,
        userId,
        submissionPath,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { addTask, submitTask };
