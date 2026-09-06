const rbacRepository = require("./rbac.repository");

const getUserAuthorization = async (userId) => {
  const roles = await rbacRepository.getUserRoles(userId);

  const permissions =
    await rbacRepository.getUserPermissions(userId);

  return {
    roles,
    permissions,
  };
};

const userHasRole = async (userId, allowedRoles) => {
  const roles = await rbacRepository.getUserRoles(userId);

  return roles.some((role) =>
    allowedRoles.includes(role)
  );
};

const userHasPermission = async (
  userId,
  requiredPermission
) => {
  const permissions =
    await rbacRepository.getUserPermissions(userId);

  return permissions.includes(requiredPermission);
};

module.exports = {
  getUserAuthorization,
  userHasRole,
  userHasPermission,
};