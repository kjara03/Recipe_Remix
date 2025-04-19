import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userRoute.js";
import favoriteRouter from "./routes/favoriteRoute.js";
import recipeRouter from "./routes/recipeRoute.js";

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get allowed origins from .env
const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(",") || [];

// Set up server
const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ extended: false }));
app.use(helmet());

// Define routes
app.use("/user", userRouter);
app.use("/favorite", favoriteRouter);
app.use("/recipe", recipeRouter);

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
