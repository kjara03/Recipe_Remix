import express from "express";
import {
  createFavoriteEntry,
  isFavoriteEntryPresent,
  removeFavoriteEntryById,
  getFavoritesByUser,
} from "../controller/favorite.js";
import { getRecipeByIds } from "../controller/recipe.js";

const router = express.Router();

// Create a favorite entry
router.post("/", async (req, res) => {
  const { userid, recipeid } = req.body; // Extract the details
  try {
    const entryInTable = await isFavoriteEntryPresent(userid, recipeid);
    if (entryInTable) {
      return res.status(409).json({ message: "Entry already favorited!" });
    }
    const entry = await createFavoriteEntry(userid, recipeid);
    if (entry.error) {
      return res.status(entry.status).json({ message: entry.error.message });
    }
    return res.status(201).json(entry);
  } catch (error) {
    return res.status(400).json({
      message: "Unable to create favorite entry!",
      error: error.message,
    });
  }
});

// Delete a favorite entry
router.delete("/", async (req, res) => {
  const { userid, recipeid } = req.body; // Extract the details
  try {
    const entryInTable = await isFavoriteEntryPresent(userid, recipeid);
    if (!entryInTable) {
      return res.status(404).json({ message: "Entry already deleted!" });
    }
    const entry = await removeFavoriteEntryById(userid, recipeid);
    if (entry.error) {
      return res.status(entry.status).json({ message: entry.error.message });
    }
    return res.status(200).json({ message: "Entry deleted!" });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to delete favorite entry!",
      error: error.message,
    });
  }
});

// Get whether a user has favorited a recipe
router.get("/:userid/:recipeid", async (req, res) => {
  const { userid, recipeid } = req.params; // Extract the details
  try {
    const entryInTable = await isFavoriteEntryPresent(userid, recipeid);
    return res.status(200).json(entryInTable);
  } catch (error) {
    return res.status(400).json({
      message: "Error finding favorite entry!",
      error: error.message,
    });
  }
});

// Retrieve user's favorite entries
router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const entries = await getFavoritesByUser(userid);
    if (entries.error) {
      return res
        .status(entries.status)
        .json({ message: entries.error.message });
    }
    // Now retrieve recipes details based on its id
    const recipeIds = entries.data.map((recipe) => recipe.recipeid);
    const recipes = await getRecipeByIds(recipeIds);
    if (recipes.error) {
      return res
        .status(recipes.status)
        .json({ message: recipes.error.message });
    }
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(400).json({
      message: "Unable to retrieve favorite entries!",
      error: error.message,
    });
  }
});

export default router;
