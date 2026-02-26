import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";
import path from "path";
import type { Request, Response, NextFunction } from "express";

dotenv.config();

mongoose
  .connect(process.env.DB_LOCAL as string)
  .then(() => {
    console.log(`server connected to database`);
  })
  .catch((error) => {
    console.log(`failed to connect to database`, error);
  });

const app = express();

app.use(express.json());
app.use(
  "/submissions",
  express.static(path.join(process.cwd(), "submissions")),
);

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({
    status: "fail",
    message: error.message,
  });
});

const port: string = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
