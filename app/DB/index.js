import mongoose from "mongoose";

export async function connect_DB() {
  try {
    await mongoose.connect(process.env.connect_DB);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Err-->", err);
  }
}
