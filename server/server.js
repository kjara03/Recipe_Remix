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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
        ],
        styleSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com",
          "'unsafe-inline'",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdn.jsdelivr.net",
        ],
      },
    },
  })
);

// Define routes
app.use("/user", userRouter);
app.use("/favorite", favoriteRouter);
app.use("/recipe", recipeRouter);

// 404 handler for unknown API routes
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, _, res) => {
  console.error("Unhandled Error:", err.stack || err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
