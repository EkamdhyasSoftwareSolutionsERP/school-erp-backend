const ApiError = require("../common/ApiError");

const rbacService = require("../modules/rbac/rbac.service");

const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ApiError(401, "Authentication required");
      }

      const hasRole = await rbacService.userHasRole(
        req.user.id,
        allowedRoles
      );

      if (!hasRole) {
        throw new ApiError(
          403,
          "You do not have permission to perform this action"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;