import mongoose from "mongoose";

interface Itask {
  title: string;
  deadline: string;
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    },
  },
});

const Task = mongoose.model("Task", taskSchema);

export { Task };
export type { Itask };
