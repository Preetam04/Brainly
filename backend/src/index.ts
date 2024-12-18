import dotenv from "dotenv";
import express from "express";
import connectDB from "./connectDB";
import {
  addContent,
  createLink,
  deleteContent,
  fetchLink,
  getAllContent,
  signIn,
  signUp,
  updateContent,
} from "./controllers";
import { verifyJWT } from "./lib";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true,
  })
);

// auth
app.post("/api/v1/sign-up", signUp);
app.post("/api/v1/sign-in", signIn);

// content
app.post("/api/v1/content", verifyJWT, addContent);
app.get("/api/v1/content", verifyJWT, getAllContent);
app.delete("/api/v1/content/:contentId", verifyJWT, deleteContent);
app.patch("/api/v1/content/:contentId", verifyJWT, updateContent);

app.get("/api/v1/brain/share", verifyJWT, createLink);
app.post("/api/v1/brain/share", fetchLink);

app.listen(process.env.PORT || 8000, async () => {
  try {
    await connectDB();

    console.log("Server running successfully::" + process.env.PORT);
  } catch (error) {
    console.log(error || "Error starting a server");
  }
});
