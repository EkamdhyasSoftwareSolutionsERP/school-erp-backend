const bcrypt = require("bcrypt");

const authRepository = require("./auth.repository");

const ApiError = require("../../common/ApiError");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
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

  // Refresh token expires in 7 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Save refresh token in database
  await authRepository.saveRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

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


const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(
      401,
      "Refresh token is required"
    );
  }

  // Verify JWT refresh token
  const decoded = verifyRefreshToken(refreshToken);

  // Check token exists in database
  const storedToken =
    await authRepository.findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new ApiError(
      401,
      "Invalid or expired refresh token"
    );
  }

  // Generate new access token
  const accessToken = generateAccessToken({
    id: decoded.id,
    email: decoded.email,
  });

  return {
    accessToken,
  };
};


const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(
      400,
      "Refresh token is required"
    );
  }

  await authRepository.deleteRefreshToken(refreshToken);

  return true;
};

const getCurrentUser = async (userId) => {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.is_active) {
    throw new ApiError(403, "User account is inactive");
  }

  const roles = await authRepository.getUserRoles(userId);

  return {
    ...user,
    roles
  };
};


module.exports = {
  login,
  refreshAccessToken,
  logout,
  getCurrentUser,
};