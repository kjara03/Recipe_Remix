import express from "express";
import { createUser, getUserByEmail } from "../controller/user.js";
import { verifyToken } from "../middleware/authentication.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = express.Router();

// Create a user
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // Hash the password
    const hash = await argon2.hash(password);
    const user = await createUser(email, hash, username);
    if (user.error) {
      return res
        .status(user.status)
        .json({ message: user.error.message, error: user.error });
    }
    return res.status(201).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create user!", error: error.message });
  }
});

// Get user based on email
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user.error) {
      return res.status(user.status).json({ message: user.error.message });
    }
    const passwordMatch = await argon2.verify(user.data.password, password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }
    // Add jwt session token
    const token = jwt.sign(
      { userid: user.data.id, username: user.data.username },
      process.env.JWT_TOKEN,
      {
        expiresIn: "168h",
      }
    );
    return res.status(200).json({ message: "Login verified!", token: token });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to retrieve user!", error: error.message });
  }
});

// Get user based on id
/*
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user.error) {
      return res.status(user.error).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to retrieve user", error: error.message });
  }
});
*/

router.get("/authentication", verifyToken, (req, res) => {
  res.json({
    message: "Authenticated",
    user: req.user,
  });
});

export default router;
