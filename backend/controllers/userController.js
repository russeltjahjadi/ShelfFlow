import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

// Description: register new user
// Route: POST /api/users
// acccess type: public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Description: register new user
// Route: POST /api/users/login
// acccess type: public
export const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User" });
});

// Description: Get user data
// Route: GET /api/users/me
// acccess type: public
export const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "User data display" });
});
