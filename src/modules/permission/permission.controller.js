const permissionService = require("./permission.service");
const ApiResponse = require("../../common/ApiResponse");

const getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await permissionService.getAllPermissions();

    return res
      .status(200)
      .json(ApiResponse.success("Permissions fetched successfully", permissions));
  } catch (error) {
    next(error);
  }
};

const getPermissionById = async (req, res, next) => {
  try {
    const permission = await permissionService.getPermissionById(
      req.params.id
    );

    return res
      .status(200)
      .json(ApiResponse.success("Permission fetched successfully", permission));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPermissions,
  getPermissionById,
};