const ApiError = require("../common/ApiError");

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return next(
        new ApiError(400, "Validation failed", errors)
      );
    }

    req.params = value;

    next();
  };
};

module.exports = validateParams;