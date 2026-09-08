const academicYearRepository =
  require("./academicYear.repository");

const ApiError =
  require("../../common/ApiError");


// Create Academic Year
const createAcademicYear = async (
  academicYearData
) => {
  const {
    school_id,
    name,
    start_date,
    end_date,
    is_current,
  } = academicYearData;

  // Check duplicate academic year
  const existingAcademicYear =
    await academicYearRepository
      .getAcademicYearBySchoolAndName(
        school_id,
        name
      );

  if (existingAcademicYear) {
    throw new ApiError(
      409,
      "Academic year already exists for this school"
    );
  }

  // Validate dates
  if (new Date(start_date) >= new Date(end_date)) {
    throw new ApiError(
      400,
      "Start date must be earlier than end date"
    );
  }

  // If new academic year is current,
  // reset existing current academic year
  if (is_current === true) {
    await academicYearRepository
      .resetCurrentAcademicYear(school_id);
  }

  return await academicYearRepository
    .createAcademicYear(academicYearData);
};


// Get All Academic Years
const getAllAcademicYears = async () => {
  return await academicYearRepository
    .getAllAcademicYears();
};


// Get Academic Year By ID
const getAcademicYearById = async (id) => {
  const academicYear =
    await academicYearRepository
      .getAcademicYearById(id);

  if (!academicYear) {
    throw new ApiError(
      404,
      "Academic year not found"
    );
  }

  return academicYear;
};


// Update Academic Year
const updateAcademicYear = async (
  id,
  academicYearData
) => {
  const academicYear =
    await academicYearRepository
      .getAcademicYearById(id);

  if (!academicYear) {
    throw new ApiError(
      404,
      "Academic year not found"
    );
  }

  // Check duplicate name if name is changed
  if (
    academicYearData.name &&
    academicYearData.name !== academicYear.name
  ) {
    const existingAcademicYear =
      await academicYearRepository
        .getAcademicYearBySchoolAndName(
          academicYear.school_id,
          academicYearData.name
        );

    if (existingAcademicYear) {
      throw new ApiError(
        409,
        "Academic year already exists for this school"
      );
    }
  }

  // Validate dates
  const startDate =
    academicYearData.start_date ||
    academicYear.start_date;

  const endDate =
    academicYearData.end_date ||
    academicYear.end_date;

  if (new Date(startDate) >= new Date(endDate)) {
    throw new ApiError(
      400,
      "Start date must be earlier than end date"
    );
  }

  // Ensure only one current academic year per school
  if (academicYearData.is_current === true) {
    await academicYearRepository
      .resetCurrentAcademicYear(
        academicYear.school_id
      );
  }

  return await academicYearRepository
    .updateAcademicYear(
      id,
      academicYearData
    );
};


// Delete Academic Year
const deleteAcademicYear = async (id) => {
  const academicYear =
    await academicYearRepository
      .deleteAcademicYear(id);

  if (!academicYear) {
    throw new ApiError(
      404,
      "Academic year not found"
    );
  }

  return academicYear;
};


module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};