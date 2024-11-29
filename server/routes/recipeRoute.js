import express from "express";
import {
  createRecipe,
  getRecipeById,
  isRecipeEntryPresent,
} from "../controller/recipe.js";

const router = express.Router();

// Create a recipe
router.post("/", async (req, res) => {
  const { id, name, image } = req.body; // Extract the details
  try {
    // If entry is already there then send an ok response
    const isRecipeInTable = await isRecipeEntryPresent(id);
    if (isRecipeInTable) {
      return res.status(200).json({ message: "Recipe already added!" });
    }
    const recipe = await createRecipe(id, name, image);
    if (recipe.error) {
      return res.status(recipe.status).json({ message: recipe.error.message });
    }
    return res.status(201).json(recipe);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to create recipe!", error: error.message });
  }
});

// Get recipe based on id
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Get the id of the recipe
  try {
    const recipe = await getRecipeById(id);
    // Return a message if recipe cannot be found with the recipe id
    if (recipe.error) {
      return res.status(404).json({ message: "Recipe not found!" });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to retrieve recipe!", error: error.message });
  }
});

export default router;
