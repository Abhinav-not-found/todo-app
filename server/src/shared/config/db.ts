import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    if (!process.env.MONGODB) return;
    await mongoose.connect(process.env.MONGODB);
    console.log("Database connected");
  } catch (error) {
    console.log("Error in database", error);
  }
};

export default connectDb;
