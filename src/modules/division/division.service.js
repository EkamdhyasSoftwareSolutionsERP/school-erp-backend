const divisionRepository = require("./division.repository");
const ApiError = require("../../common/ApiError");


// Create Division
const createDivision = async (divisionData) => {
  const {
    standard_id,
    academic_year_id,
    name,
    code,
  } = divisionData;

  // Check duplicate division name
  const existingDivision =
    await divisionRepository
      .getDivisionByStandardAcademicYearAndName(
        standard_id,
        academic_year_id,
        name
      );

  if (existingDivision) {
    throw new ApiError(
      409,
      "Division name already exists for this standard and academic year"
    );
  }

  // Check duplicate division code
  const existingCode =
    await divisionRepository
      .getDivisionByStandardAcademicYearAndCode(
        standard_id,
        academic_year_id,
        code
      );

  if (existingCode) {
    throw new ApiError(
      409,
      "Division code already exists for this standard and academic year"
    );
  }

  return await divisionRepository.createDivision(
    divisionData
  );
};


// Get All Divisions
const getAllDivisions = async () => {
  return await divisionRepository.getAllDivisions();
};


// Get Division By ID
const getDivisionById = async (id) => {
  const division =
    await divisionRepository.getDivisionById(id);

  if (!division) {
    throw new ApiError(
      404,
      "Division not found"
    );
  }

  return division;
};


// Update Division
const updateDivision = async (
  id,
  divisionData
) => {
  const division =
    await divisionRepository.getDivisionById(id);

  if (!division) {
    throw new ApiError(
      404,
      "Division not found"
    );
  }

  // Check duplicate name if changed
  if (
    divisionData.name &&
    divisionData.name !== division.name
  ) {
    const existingDivision =
      await divisionRepository
        .getDivisionByStandardAcademicYearAndName(
          division.standard_id,
          division.academic_year_id,
          divisionData.name
        );

    if (existingDivision) {
      throw new ApiError(
        409,
        "Division name already exists for this standard and academic year"
      );
    }
  }

  // Check duplicate code if changed
  if (
    divisionData.code &&
    divisionData.code !== division.code
  ) {
    const existingCode =
      await divisionRepository
        .getDivisionByStandardAcademicYearAndCode(
          division.standard_id,
          division.academic_year_id,
          divisionData.code
        );

    if (existingCode) {
      throw new ApiError(
        409,
        "Division code already exists for this standard and academic year"
      );
    }
  }

  return await divisionRepository.updateDivision(
    id,
    divisionData
  );
};


// Delete Division
const deleteDivision = async (id) => {
  const division =
    await divisionRepository.deleteDivision(id);

  if (!division) {
    throw new ApiError(
      404,
      "Division not found"
    );
  }

  return division;
};


module.exports = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};