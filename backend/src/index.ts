import dotenv from "dotenv";
import express from "express";
import connectDB from "./connectDB";
import { addContent, signIn, signUp } from "./controllers";
import { verifyJWT } from "./lib";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.post("/api/sign-up", signUp);
app.post("/api/sign-in", signIn);
app.post("/api/add-content", verifyJWT, addContent);

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();

    console.log("Server running successfully::" + process.env.PORT);
  } catch (error) {
    console.log(error || "Error starting a server");
  }
});
