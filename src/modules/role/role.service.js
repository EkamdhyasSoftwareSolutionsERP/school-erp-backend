const roleRepository = require("./role.repository");

const ApiError = require("../../common/ApiError");

const getAllRoles = async () => {
  return await roleRepository.getAllRoles();
};

const getRoleById = async (id) => {
  const role = await roleRepository.getRoleById(id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  return role;
};

const createRole = async ({ name, description }) => {
  const existingRole = await roleRepository.getRoleByName(name);

  if (existingRole) {
    throw new ApiError(409, "Role already exists");
  }

  return await roleRepository.createRole({
    name,
    description,
  });
};

const updateRole = async (id, { name, description }) => {
  const role = await roleRepository.getRoleById(id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  if (name) {
    const existingRole = await roleRepository.getRoleByName(name);

    if (existingRole && existingRole.id !== id) {
      throw new ApiError(409, "Role already exists");
    }
  }

  const updatedRole = await roleRepository.updateRole(id, {
    name,
    description,
  });

  return updatedRole;
};

const updateRoleStatus = async (id, isActive) => {
  const role = await roleRepository.getRoleById(id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  return await roleRepository.updateRoleStatus(
    id,
    isActive
  );
};

const deleteRole = async (id) => {
  const role = await roleRepository.getRoleById(id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  await roleRepository.deleteRole(id);

  return true;
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  updateRoleStatus,
  deleteRole,
};