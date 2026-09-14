const roleService = require("./role.service");
const ApiResponse = require("../../common/ApiResponse");

const getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getAllRoles();

    return res.status(200).json(
      ApiResponse.success(
        "Roles fetched successfully",
        roles
      )
    );
  } catch (error) {
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(
      req.params.id
    );

    return res.status(200).json(
      ApiResponse.success(
        "Role fetched successfully",
        role
      )
    );
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);

    return res.status(201).json(
      ApiResponse.success(
        "Role created successfully",
        role
      )
    );
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await roleService.updateRole(
      req.params.id,
      req.body
    );

    return res.status(200).json(
      ApiResponse.success(
        "Role updated successfully",
        role
      )
    );
  } catch (error) {
    next(error);
  }
};

const updateRoleStatus = async (req, res, next) => {
  try {
    const role = await roleService.updateRoleStatus(
      req.params.id,
      req.body.isActive
    );

    return res.status(200).json(
      ApiResponse.success(
        "Role status updated successfully",
        role
      )
    );
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    await roleService.deleteRole(req.params.id);

    return res.status(200).json(
      ApiResponse.success(
        "Role deleted successfully",
        null
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  updateRoleStatus,
  deleteRole,
};