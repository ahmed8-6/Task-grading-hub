import mongoose from "mongoose";

interface Igrade {
  submissionId: mongoose.Types.ObjectId | string;
  grade: number;
  feedback: string;
}

const gradeSchema = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

export { Grade };
export type { Igrade };
