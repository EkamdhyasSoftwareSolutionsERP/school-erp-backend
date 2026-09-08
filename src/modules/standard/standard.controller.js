const standardService = require("./standard.service");

// Create Standard
const createStandard = async (req, res, next) => {
  try {
    const standard = await standardService.createStandard(req.body);

    res.status(201).json({
      success: true,
      message: "Standard created successfully",
      data: standard,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Standards
const getAllStandards = async (req, res, next) => {
  try {
    const standards = await standardService.getAllStandards();

    res.status(200).json({
      success: true,
      message: "Standards fetched successfully",
      data: standards,
    });
  } catch (error) {
    next(error);
  }
};

// Get Standard By ID
const getStandardById = async (req, res, next) => {
  try {
    const standard = await standardService.getStandardById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Standard fetched successfully",
      data: standard,
    });
  } catch (error) {
    next(error);
  }
};

// Update Standard
const updateStandard = async (req, res, next) => {
  try {
    const standard = await standardService.updateStandard(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Standard updated successfully",
      data: standard,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Standard
const deleteStandard = async (req, res, next) => {
  try {
    const standard = await standardService.deleteStandard(req.params.id);

    res.status(200).json({
      success: true,
      message: "Standard deleted successfully",
      data: standard,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStandard,
  getAllStandards,
  getStandardById,
  updateStandard,
  deleteStandard,
};