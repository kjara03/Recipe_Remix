import express from "express";
import { createUser, getUserById, getUserByEmail } from "../controller/user.js";
import argon2 from "argon2";

const router = express.Router();

// Create a user
router.post("/", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // Hash the password
    const hash = await argon2.hash(password);
    const { data } = await createUser(email, hash, username);
    if (data.error) {
      return res
        .status(data.status)
        .json({ message: data.error.message, error: data.error });
    }
    return res.status(201).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create user", error: error.message });
  }
});

// Get user based on email
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data } = await getUserByEmail(email);
    if (data.error) {
      return res.status(data.status).json({ message: data.error.message });
    }
    const passwordMatch = await argon2.verify(data.data.password, password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "Login verified" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to retrieve user", error: error.message });
  }
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
