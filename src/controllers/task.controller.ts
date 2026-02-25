import type { Request, Response, NextFunction } from "express";
import { Task } from "../models/task.model.js";

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
    // next(error);
  }
};

export { addTask };
