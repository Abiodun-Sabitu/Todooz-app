const createHttpError = require("http-errors");
const User = require('../model/user');
const { createToken } = require("../config/jwt");


const register = async (req, res, next) => {
   // console.log("Registering user:", req.body);
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      throw createHttpError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "User already exists");
    }

    // password hashing is being handled by the User model's pre-save hook

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {

      //console.log("Registering user:", req.body);
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      throw createHttpError(400, "Username and password are required");
    }

    // Find user by username
    const user = await User.findOne({ username });
     console.log("User found:", user);
    if (!user) {
      throw createHttpError(401, "Invalid username or password");
    }
   

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw createHttpError(401, "Invalid username or password");
    }

    // Generate JWT token
    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 86400000,
    });

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Respond with user data and token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        lastLogin: user.lastLogin,
        token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
