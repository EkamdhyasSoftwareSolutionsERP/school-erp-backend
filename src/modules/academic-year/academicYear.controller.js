const academicYearService =
  require("./academicYear.service");


// Create Academic Year
const createAcademicYear = async (req, res, next) => {
  try {
    const academicYear =
      await academicYearService.createAcademicYear(
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Academic year created successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};


// Get All Academic Years
const getAllAcademicYears = async (
  req,
  res,
  next
) => {
  try {
    const academicYears =
      await academicYearService.getAllAcademicYears();

    res.status(200).json({
      success: true,
      message: "Academic years fetched successfully",
      data: academicYears,
    });
  } catch (error) {
    next(error);
  }
};


// Get Academic Year By ID
const getAcademicYearById = async (
  req,
  res,
  next
) => {
  try {
    const academicYear =
      await academicYearService.getAcademicYearById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Academic year fetched successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};


// Update Academic Year
const updateAcademicYear = async (
  req,
  res,
  next
) => {
  try {
    const academicYear =
      await academicYearService.updateAcademicYear(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Academic year updated successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};


// Delete Academic Year
const deleteAcademicYear = async (
  req,
  res,
  next
) => {
  try {
    const academicYear =
      await academicYearService.deleteAcademicYear(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Academic year deleted successfully",
      data: academicYear,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};