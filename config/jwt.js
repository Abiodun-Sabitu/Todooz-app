const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

const createToken = (user) => {
  if (!user || !user._id) {
    throw new Error("User object with _id is required to generate token");
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
    const err = new Error("Authentication required. Please log in.");
    err.status = 401;
    throw err;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const err = new Error("Session expired. Please log in again.");
      err.status = 401;
      throw err;
    }
    const err = new Error("Invalid authentication token. Please log in again.");
    err.status = 401;
    throw err;
  }
};

module.exports = {
  createToken,
  verifyToken,
};