const bcrypt = require("bcrypt");

const authRepository = require("./auth.repository");
const ApiError = require("../../common/ApiError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");

const login = async (email, password) => {
  // Find user
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Check active status
  if (!user.is_active) {
    throw new ApiError(403, "User account is inactive");
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // JWT payload
  const payload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

module.exports = {
  login,
};