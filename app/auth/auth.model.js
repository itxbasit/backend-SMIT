import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 8,
      required: true,
    },
    type: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    profileUrl: {
      type: String,
      default: null
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("users", userSchema);
