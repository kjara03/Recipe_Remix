import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import favoriteRouter from "./routes/favoriteRoute.js";
import recipeRouter from "./routes/recipeRoute.js";

dotenv.config(); // Load environment variables

// Set up server
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use("/user", userRouter);
app.use("/favorite", favoriteRouter);
app.use("/recipe", recipeRouter);

const PORT = process.env.DB_PORT;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
