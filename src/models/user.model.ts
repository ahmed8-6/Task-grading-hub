import mongoose, { type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export type Iuser = InferSchemaType<typeof userSchema>;
export type UserDocument = mongoose.HydratedDocument<Iuser>;

const User = mongoose.model("User", userSchema);

export { User };
