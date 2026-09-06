const jwt = require("jsonwebtoken");
const ApiError = require("../common/ApiError");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication token is required");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new ApiError(401, "Access token has expired")
      );
    }

    return next(
      error.statusCode
        ? error
        : new ApiError(401, "Invalid authentication token")
    );
  }
};

module.exports = authenticate;