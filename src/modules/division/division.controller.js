const divisionService = require("./division.service");

// Create Division
const createDivision = async (req, res, next) => {
  try {
    const division = await divisionService.createDivision(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Division created successfully",
      data: division,
    });
  } catch (error) {
    next(error);
  }
};


// Get All Divisions
const getAllDivisions = async (req, res, next) => {
  try {
    const divisions = await divisionService.getAllDivisions();

    res.status(200).json({
      success: true,
      message: "Divisions fetched successfully",
      data: divisions,
    });
  } catch (error) {
    next(error);
  }
};


// Get Division By ID
const getDivisionById = async (req, res, next) => {
  try {
    const division = await divisionService.getDivisionById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Division fetched successfully",
      data: division,
    });
  } catch (error) {
    next(error);
  }
};


// Update Division
const updateDivision = async (req, res, next) => {
  try {
    const division = await divisionService.updateDivision(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Division updated successfully",
      data: division,
    });
  } catch (error) {
    next(error);
  }
};


// Delete Division
const deleteDivision = async (req, res, next) => {
  try {
    const division = await divisionService.deleteDivision(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Division deleted successfully",
      data: division,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};