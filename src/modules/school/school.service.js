const schoolRepository = require("./school.repository");
const ApiError = require("../../common/ApiError");


// Create School
const createSchool = async (schoolData) => {
  const existingSchool =
    await schoolRepository.getSchoolByCode(schoolData.code);

  if (existingSchool) {
    throw new ApiError(
      409,
      "School code already exists"
    );
  }

  return await schoolRepository.createSchool(
    schoolData
  );
};


// Get All Schools
const getAllSchools = async () => {
  return await schoolRepository.getAllSchools();
};


// Get School By ID
const getSchoolById = async (id) => {
  const school =
    await schoolRepository.getSchoolById(id);

  if (!school) {
    throw new ApiError(
      404,
      "School not found"
    );
  }

  return school;
};


// Update School
const updateSchool = async (id, schoolData) => {
  const school =
    await schoolRepository.getSchoolById(id);

  if (!school) {
    throw new ApiError(
      404,
      "School not found"
    );
  }

  // Check duplicate school code
  if (
    schoolData.code &&
    schoolData.code !== school.code
  ) {
    const existingSchool =
      await schoolRepository.getSchoolByCode(
        schoolData.code
      );

    if (existingSchool) {
      throw new ApiError(
        409,
        "School code already exists"
      );
    }
  }

  return await schoolRepository.updateSchool(
    id,
    schoolData
  );
};


// Delete School
const deleteSchool = async (id) => {
  const school =
    await schoolRepository.deleteSchool(id);

  if (!school) {
    throw new ApiError(
      404,
      "School not found"
    );
  }

  return school;
};


module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};