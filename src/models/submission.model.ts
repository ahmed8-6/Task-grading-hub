import mongoose from "mongoose";

interface Isubmission {
  title: string;
  description: string;
  deadline: string;
}

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  submissionPath: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
  },
  feedback: {
    type: String,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export { Submission };
export type { Isubmission };
