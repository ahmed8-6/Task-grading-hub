import type { Request, Response, NextFunction } from "express";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user.isAdmin) next();
  else {
    res.status(403).json({
      status: "fail",
      message: "you don't have the access to view this page",
    });
  }
};
