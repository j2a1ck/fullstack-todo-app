import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongoose connected to ${conn.connection.host}`);
  } catch (error) {
    console.error(`error is ${error.message}`);
    process.exit(1);
  }
};
