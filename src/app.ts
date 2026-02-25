import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";

dotenv.config();
console.log(process.env.DB_LOCAL);
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
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

const port: string = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
