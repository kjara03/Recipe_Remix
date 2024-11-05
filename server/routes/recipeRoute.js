import express from "express";
import { createRecipe, getRecipeById } from "../controller/recipe.js";

const router = express.Router();

// Create a recipe
router.post("/", async (req, res) => {
  /*
  const { id, name, image } = req.body;
  try {
    const { data } = await createRecipe(id, name, image);
    res.status(201).json(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(400)
      .json({ message: "Failed to create image", error: error.message });
  }*/
});

// Get recipe based on id
router.get("/:id", async (req, res) => {
  /*
  const { id } = req.query;
  try {
    const { data } = await getRecipeById(id);
    if (!data) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Failed to retrieve recipe", error: error.message });
  }*/
});

export default router;
