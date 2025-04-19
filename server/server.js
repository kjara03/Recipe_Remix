import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/userRoute.js";
import favoriteRouter from "./routes/favoriteRoute.js";
import recipeRouter from "./routes/recipeRoute.js";

dotenv.config(); // Load environment variables

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
