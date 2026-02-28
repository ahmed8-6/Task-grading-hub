import mongoose from "mongoose";

interface Isubmission {
  userId: mongoose.Types.ObjectId | string;
  taskId: mongoose.Types.ObjectId | string;
  submissionPath: string;
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
});

const Submission = mongoose.model("Submission", submissionSchema);

export { Submission };
export type { Isubmission };
