import type { Request, Response, NextFunction } from "express";
import { Submission } from "../models/submission.model.js";
import { Grade } from "../models/grade.model.js";
import type { Igrade } from "../models/grade.model.js";

const getSubmissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json({
      status: "success",
      data: {
        submissions,
      },
    });
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const submissionId = req.params.submissionId;
  const { grade, feedback } = req.body;
  try {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({
        status: "fail",
        message: "Submission not found",
      });
    }
    const newGrade = new Grade({
      submissionId,
      grade,
      feedback,
    });
    await newGrade.save();
    res.status(201).json({
      status: "success",
      data: {
        gradeId: newGrade._id,
        submissionId,
        grade,
        feedback,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getGrades = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.userId;
  try {
    const submissions = await Submission.find({ userId });
    let grades: Igrade[] = [];
    for (let submission of submissions) {
      const grade = await Grade.findOne({ submissionId: submission._id });
      if (grade) {
        grades.push(grade);
      }
    }
    res.status(200).json({
      status: "success",
      data: {
        grades,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getSubmissions, gradeSubmission, getGrades };
