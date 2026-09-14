const permissionRepository = require("./permission.repository");
const ApiError = require("../../common/ApiError");

const getAllPermissions = async () => {
  return await permissionRepository.getAllPermissions();
};

const getPermissionById = async (id) => {
  const permission = await permissionRepository.getPermissionById(id);

  if (!permission) {
    throw new ApiError(404, "Permission not found");
  }

  return permission;
};

module.exports = {
  getAllPermissions,
  getPermissionById,
};