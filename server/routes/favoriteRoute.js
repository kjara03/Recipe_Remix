import express from "express";
import {
  createFavoriteEntry,
  removeFavoriteEntryById,
  getFavoritesByUser,
} from "../controller/favorite";

const router = express.Router();

// Create a favorite entry
router.post("/", async (req, res) => {
  const { userid, recipeid } = req.body; // Extract the details
  try {
    const entry = await createFavoriteEntry(userid, recipeid);
    console.log(entry);
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
  const { id } = req.body; // Extract the details
  try {
    const entry = await removeFavoriteEntryById(id);
    console.log(entry);
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

// Retrieve user's favorite entries
router.get("/user/:id", async (req, res) => {
  const { userid } = req.params;
  try {
    const entries = await getFavoritesByUser(userid);
    console.log(entries);
    if (entries.error) {
      return res
        .status(entries.status)
        .json({ message: entries.error.message });
    }
    return res.status(201).json(entries);
  } catch (error) {
    return res.status(400).json({
      message: "Unable to retrieve favorite entries!",
      error: error.message,
    });
  }
});

export default router;
