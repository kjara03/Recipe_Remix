import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import favoriteRouter from "./routes/favoriteRoute.js";
import recipeRouter from "./routes/recipeRoute.js";

dotenv.config(); // Load environment variables

const app = express();

app.use("/users", userRouter);
app.use("/favorite", favoriteRouter);
app.use("/recipe", recipeRouter);

const PORT = process.env.DB_PORT || 5432;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
