const { verifyToken } = require("../config/jwt");

const authMiddleware = (req, res, next) => {
  // Check for token in cookies or Authorization header
  const bearerToken = req.headers.authorization?.split(" ")[1];
  const token = req.cookies.token || bearerToken;

  if (!token) {
    // No token? Respond with a friendly error message.
    return res
      .status(401)
      .json({ error: "Authentication required. Please log in." });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      // Invalid token payload — respond with error
      return res
        .status(401)
        .json({ error: "Invalid authentication token. Please log in again." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    // Token expired or invalid — respond with error
    return res
      .status(401)
      .json({
        error: "Session expired or invalid token. Please log in again.",
      });
  }
};

module.exports = authMiddleware;
// This middleware checks for a valid JWT token in cookies and returns friendly error messages.
