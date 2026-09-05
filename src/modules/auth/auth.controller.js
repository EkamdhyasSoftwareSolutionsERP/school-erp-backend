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

module.exports = {
  login,
};