const jwt = require("jsonwebtoken");
require("dotenv").config();
const createHttpError = require("http-errors");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

const createToken = (user) => {
  if (!user || !user._id) {
    throw createHttpError(400, "User object with _id is required to generate token");
  }

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
};

const verifyToken = (token) => {
  if (!token) {
    throw createHttpError(401, "Authentication required. Please log in.");
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createHttpError(401, "Session expired. Please log in again.");
    }
    throw createHttpError(401, "Invalid authentication token. Please log in again.");
  
  }
};

module.exports = {
  createToken,
  verifyToken,
};