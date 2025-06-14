const createHttpError = require("http-errors");
const { verifyToken } = require("../config/jwt");
const User = require("../model/user");

const authMiddleware = async (req, res, next) => {
  // Check for token in cookies or Authorization header
  const bearerToken = req.headers.authorization?.split(" ")[1];
  const token = req.cookies.token || bearerToken;

  if (!token) {
    // No token? Respond with a friendly error message.
      throw createHttpError(
        401,
        "Authentication required. Please log in."
      );
  }

  try {
    const decoded = verifyToken(token);
    //console.log("Decoded token:", decoded);

    if (!decoded || !decoded.id) {
      // Invalid token payload — respond with error
      throw createHttpError(
        401,
        "Invalid authentication token. Please log in again."
      );
    }

    const user = await User.findOne({ _id: decoded.id }).select(
      "-password -__v"
    );
    if (!user) {
      throw createHttpError(404, "User not found. Please register or log in.");
    }

    req.user = user;
    next();
  } catch (err) {
    // Token expired or invalid — respond with error
    return next(
      createHttpError(
        401,
        "Session expired or invalid token. Please log in again."
      )
    );
  }
};

module.exports = authMiddleware;
// This middleware checks for a valid JWT token in cookies and returns friendly error messages.
