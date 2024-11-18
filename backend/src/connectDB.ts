import mongoose from "mongoose";
import { DB_NAME } from "./constant";

const connectDB = async () => {
  console.log(process.env.MONGODB_URI);

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
  }
};

export default connectDB;
