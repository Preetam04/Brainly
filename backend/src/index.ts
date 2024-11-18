import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: "./.env" });

const app = express();

app.listen(process.env.PORT || 8000, async () => {
  try {
    console.log("server running successfully");
  } catch (error) {
    console.log(error || "Error starting a server");
  }
});
