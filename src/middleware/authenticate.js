const jwt = require("jsonwebtoken");
const ApiError = require("../common/ApiError");
const userRepository = require("../modules/user/user.repository");

const authenticate = async (req, res, next) => {
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
    const user = await userRepository.getUserById(decoded.id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (!user.is_active) {
      throw new ApiError(403, "User account is inactive");
    }

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