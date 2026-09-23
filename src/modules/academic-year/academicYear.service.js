const academicYearRepository =
  require("./academicYear.repository");

const ApiError =
  require("../../common/ApiError");


// Create Academic Year
const createAcademicYear = async (academicYearData, schoolIds) => {
  if (!schoolIds || schoolIds.length === 0) {
    throw new ApiError(
      403,
      "No authorized school context found"
    );
  }

  if (schoolIds.length > 1) {
    throw new ApiError(
      400,
      "Multiple schools are authorized. School context must be selected."
    );
  }

  const school_id = schoolIds[0];

  const { name, start_date, end_date, is_current } = academicYearData;

  const existingAcademicYear =
    await academicYearRepository.getAcademicYearBySchoolAndName(
      school_id,
      name
    );

  if (existingAcademicYear) {
    throw new ApiError(
      409,
      "Academic year already exists for this school"
    );
  }

  if (new Date(start_date) >= new Date(end_date)) {
    throw new ApiError(
      400,
      "Start date must be earlier than end date"
    );
  }

  if (is_current === true) {
    await academicYearRepository.resetCurrentAcademicYear(
      school_id
    );
  }

  return await academicYearRepository.createAcademicYear({
    school_id,
    name,
    start_date,
    end_date,
    is_current,
  });
};


// Get All Academic Years
const getAllAcademicYears = async (schoolIds) => {
  return await academicYearRepository.getAllAcademicYears(schoolIds);
};


// Get Academic Year By ID
const getAcademicYearById = async (id, schoolIds) => {
  const academicYear =
    await academicYearRepository.getAcademicYearById(id, schoolIds);

  if (!academicYear) {
    throw new ApiError(404, "Academic year not found");
  }

  return academicYear;
};


// Update Academic Year
const updateAcademicYear = async (
  id,
  academicYearData,
  schoolIds,
) => {
  const academicYear =
    await academicYearRepository
      .getAcademicYearById(id,
        schoolIds,
      );

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
      academicYearData,
      schoolIds
    );
};


// Delete Academic Year
const deleteAcademicYear = async (id, schoolIds) => {
  const academicYear =
    await academicYearRepository.deleteAcademicYear(
      id,
      schoolIds
    );

  if (!academicYear) {
    throw new ApiError(404, "Academic year not found");
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