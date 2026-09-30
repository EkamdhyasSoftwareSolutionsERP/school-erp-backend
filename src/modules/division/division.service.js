const divisionRepository = require("./division.repository");
const ApiError = require("../../common/ApiError");

// Create Division
const createDivision = async (divisionData, schoolIds) => {
  if (!schoolIds || schoolIds.length === 0) {
    throw new ApiError(403, "No authorized school context found");
  }

  if (schoolIds.length > 1) {
    throw new ApiError(
      400,
      "Multiple schools are authorized. School context must be selected."
    );
  }

  const schoolId = schoolIds[0];

  const {
    standard_id,
    academic_year_id,
    name,
    code,
  } = divisionData;

  // Verify Standard belongs to authorized school
  const standard =
    await divisionRepository.getStandardByIdAndSchool(
      standard_id,
      schoolId
    );

  if (!standard) {
    throw new ApiError(
      404,
      "Standard not found"
    );
  }

  // Verify Academic Year belongs to authorized school
  const academicYear =
    await divisionRepository.getAcademicYearByIdAndSchool(
      academic_year_id,
      schoolId
    );

  if (!academicYear) {
    throw new ApiError(
      404,
      "Academic year not found"
    );
  }

  // Check duplicate division name
  const existingDivision =
    await divisionRepository
      .getDivisionByStandardAcademicYearAndName(
        standard_id,
        academic_year_id,
        name,
        schoolId
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
        code,
        schoolId
      );

  if (existingCode) {
    throw new ApiError(
      409,
      "Division code already exists for this standard and academic year"
    );
  }

  return await divisionRepository.createDivision(
    divisionData,
    schoolId
  );
};

// Get All Divisions
const getAllDivisions = async (schoolIds) => {
  if (!schoolIds || schoolIds.length === 0) {
    throw new ApiError(403, "No authorized school context found");
  }

  return await divisionRepository.getAllDivisions(schoolIds);
};

// Get Division By ID
const getDivisionById = async (id, schoolIds) => {
  const division =
    await divisionRepository.getDivisionById(
      id,
      schoolIds
    );

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
  divisionData,
  schoolIds
) => {
  const division =
    await divisionRepository.getDivisionById(
      id,
      schoolIds
    );

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
          divisionData.name,
          division.school_id
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
          divisionData.code,
          division.school_id
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
    divisionData,
    schoolIds
  );
};

// Delete Division
const deleteDivision = async (
  id,
  schoolIds
) => {
  const division =
    await divisionRepository.deleteDivision(
      id,
      schoolIds
    );

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