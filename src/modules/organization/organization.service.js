const organizationRepository = require("./organization.repository");
const ApiError = require("../../common/ApiError");

const createOrganization = async (name, code) => {
  const existingOrganization =
    await organizationRepository.getOrganizationByCode(code);

  if (existingOrganization) {
    throw new ApiError(
      409,
      "Organization code already exists"
    );
  }

  return await organizationRepository.createOrganization(
    name,
    code
  );
};

const getAllOrganizations = async () => {
  return await organizationRepository.getAllOrganizations();
};

const getOrganizationById = async (id) => {
  const organization =
    await organizationRepository.getOrganizationById(id);

  if (!organization) {
    throw new ApiError(
      404,
      "Organization not found"
    );
  }

  return organization;
};

const updateOrganization = async (
  id,
  name,
  code,
  isActive
) => {
  const organization =
    await organizationRepository.getOrganizationById(id);

  if (!organization) {
    throw new ApiError(
      404,
      "Organization not found"
    );
  }

  if (code && code !== organization.code) {
    const existingOrganization =
      await organizationRepository.getOrganizationByCode(code);

    if (existingOrganization) {
      throw new ApiError(
        409,
        "Organization code already exists"
      );
    }
  }

  return await organizationRepository.updateOrganization(
    id,
    name,
    code,
    isActive
  );
};

const deleteOrganization = async (id) => {
  const organization =
    await organizationRepository.deleteOrganization(id);

  if (!organization) {
    throw new ApiError(
      404,
      "Organization not found"
    );
  }

  return organization;
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};