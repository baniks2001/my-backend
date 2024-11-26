import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itemRoutes from "../src/routes/itemRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection with Mongoose
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB with Mongoose");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

// Use itemRoutes for all /api/items routes
app.use("/api/items", itemRoutes);

// server start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
