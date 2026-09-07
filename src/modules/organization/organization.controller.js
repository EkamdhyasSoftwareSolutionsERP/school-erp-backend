const organizationService = require("./organization.service");

const createOrganization = async (req, res, next) => {
  try {
   

    const { name, code } = req.body;

   
    const organization =
      await organizationService.createOrganization(name, code);

    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: organization,
    });
  } catch (error) {
    console.error("CREATE ORGANIZATION ERROR:", error);
    next(error);
  }
};

const getAllOrganizations = async (req, res, next) => {
  try {
    const organizations =
      await organizationService.getAllOrganizations();

    return res.status(200).json({
      success: true,
      message: "Organizations fetched successfully",
      data: organizations,
    });
  } catch (error) {
    next(error);
  }
};

const getOrganizationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const organization =
      await organizationService.getOrganizationById(id);

    return res.status(200).json({
      success: true,
      message: "Organization fetched successfully",
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, code, is_active } = req.body;

    const organization =
      await organizationService.updateOrganization(
        id,
        name,
        code,
        is_active
      );

    return res.status(200).json({
      success: true,
      message: "Organization updated successfully",
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const organization =
      await organizationService.deleteOrganization(id);

    return res.status(200).json({
      success: true,
      message: "Organization deleted successfully",
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};