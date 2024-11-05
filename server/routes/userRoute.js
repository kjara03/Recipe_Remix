import express from "express";
import { createUser, getUserById, getUserByEmail } from "../controller/user.js";

const router = express.Router();

// Create a user
router.post("/", async (req, res) => {
  /*
  const { email, password, username } = req.body;
  try {
    // Hash the password
    const hash = password;
    const { data } = await createUser(email, hash, username);
    res.status(201).json(data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(400)
      .json({ message: "Failed to create user", error: error.message });
  }
      */
});

// Get user based on email
router.get("/email", async (req, res) => {
  /*
  const { email } = req.query;
  try {
    const { data } = await getUserByEmail(email);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Failed to retrieve user", error: error.message });
  }*/
});

// Get user based on id
router.get("/id/:id", async (req, res) => {
  /*
  const { id } = req.params;
  try {
    const { data } = await getUserById(id);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Failed to retrieve user", error: error.message });
  }*/
});

export default router;
