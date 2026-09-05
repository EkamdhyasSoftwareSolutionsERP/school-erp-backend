const ApiResponse = require("../common/ApiResponse");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json(
    ApiResponse.error(
      err.message || "Internal Server Error",
      err.errors || null
    )
  );
};

module.exports = errorHandler;