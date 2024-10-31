import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.DB_PORT || 5432;

app.listen(PORT, (error) => {
  error
    ? console.log("Error starting server: ", error)
    : console.log(`Server started on port ${PORT}`);
});
