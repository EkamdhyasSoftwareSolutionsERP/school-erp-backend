const ApiError = require("../common/ApiError");

const rbacService = require("../modules/rbac/rbac.service");

const permission = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ApiError(401, "Authentication required");
      }

      const authorization =
        await rbacService.getUserAuthorization(req.user.id);

      const hasPermission = requiredPermissions.some(
        (requiredPermission) =>
          authorization.permissions.includes(requiredPermission)
      );

      if (!hasPermission) {
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

module.exports = permission;