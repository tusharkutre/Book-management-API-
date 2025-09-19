import { createUserRegister, getUserByEmail } from "../models/user.model.js";
import { generateToken } from "../tokens/token.js";

// auth login and register
const postRegister = async (req, res) => {
  console.log("Registration data received:", req.body);

  const { name, email, password } = req.body;

  try {
    // First check if user already exists
    const userExists = await getUserByEmail(email);
    console.log("user Exists :", userExists);

    if (userExists && userExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, try different one!",
      });
    }

    // If user doesn't exist, create new user
    const userId = await createUserRegister(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      id: userId,
      user: { name, email, password }, // In production, do not send password back
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Could not create a user",
    });
  }
};

// backend validations logic

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login data", req.body);

    // Validate input form validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password both are required",
      });
    }

    const users = await getUserByEmail(email);

    // Check if user exists (users is an array from database)
    if (!users || users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Get the first (and should be only) user
    const user = users[0];

    // Compare passwords (plain text for testing purposes)
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Generate token after successful validation
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    console.log("Token generated successfully:", token ? "Yes" : "No");

    // Set cookie with token
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "lax", // Changed from 'strict' to 'lax' for localhost development
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAuthMe = (req, res) => {
  // if user is not authenticated then return 401 status code
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }
  return res.send(`<h1>Hello ${req.user.name}</h1>`);
};

// removing cookie on logout
const logoutUser = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

export { postRegister, postLogin, getAuthMe, logoutUser };

// // Simple email validation
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// if (!emailRegex.test(email)) {
//     return res.status(400).json({
//         success: false,
//         message: "Please provide a valid email address"
//     });
// }
