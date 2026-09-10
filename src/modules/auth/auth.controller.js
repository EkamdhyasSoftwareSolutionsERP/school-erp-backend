const authService = require("./auth.service");
const ApiResponse = require("../../common/ApiResponse");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    return res.status(200).json(
      ApiResponse.success("Login successful", data)
    );
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const result =
      await authService.refreshAccessToken(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body || {};

    await authService.logout(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: null
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const data = await authService.forgotPassword(email);

    return res.status(200).json({
      success: true,
      message:
        "If the email exists, password reset instructions have been generated",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;

    const data = await authService.resetPassword(
      resetToken,
      newPassword
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  refresh,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
};