const standardRepository = require("./standard.repository");
const ApiError = require("../../common/ApiError");

// Create Standard
const createStandard = async (standardData, schoolIds) => {
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

  const schoolId = schoolIds[0];

  const { name, code } = standardData;

  // Check duplicate standard name
  const existingStandard =
    await standardRepository.getStandardBySchoolAndName(
      schoolId,
      name
    );

  if (existingStandard) {
    throw new ApiError(
      409,
      "Standard name already exists for this school"
    );
  }

  // Check duplicate standard code
  const existingCode =
    await standardRepository.getStandardBySchoolAndCode(
      schoolId,
      code
    );

  if (existingCode) {
    throw new ApiError(
      409,
      "Standard code already exists for this school"
    );
  }

  return await standardRepository.createStandard(
    standardData,
    schoolId
  );
};

// Get All Standards
const getAllStandards = async (schoolIds) => {
  return await standardRepository.getAllStandards(
    schoolIds
  );
};

// Get Standard By ID
const getStandardById = async (id, schoolIds) => {
  const standard =
    await standardRepository.getStandardById(
      id,
      schoolIds
    );

  if (!standard) {
    throw new ApiError(
      404,
      "Standard not found"
    );
  }

  return standard;
};

// Update Standard
const updateStandard = async (
  id,
  standardData,
  schoolIds
) => {
  const standard =
    await standardRepository.getStandardById(
      id,
      schoolIds
    );

  if (!standard) {
    throw new ApiError(
      404,
      "Standard not found"
    );
  }

  // Check duplicate name
  if (
    standardData.name &&
    standardData.name !== standard.name
  ) {
    const existingStandard =
      await standardRepository.getStandardBySchoolAndName(
        standard.school_id,
        standardData.name
      );

    if (existingStandard) {
      throw new ApiError(
        409,
        "Standard name already exists for this school"
      );
    }
  }

  // Check duplicate code
  if (
    standardData.code &&
    standardData.code !== standard.code
  ) {
    const existingCode =
      await standardRepository.getStandardBySchoolAndCode(
        standard.school_id,
        standardData.code
      );

    if (existingCode) {
      throw new ApiError(
        409,
        "Standard code already exists for this school"
      );
    }
  }

  return await standardRepository.updateStandard(
    id,
    standardData,
    schoolIds
  );
};

// Delete Standard
const deleteStandard = async (id, schoolIds) => {
  const standard =
    await standardRepository.deleteStandard(
      id,
      schoolIds
    );

  if (!standard) {
    throw new ApiError(
      404,
      "Standard not found"
    );
  }

  return standard;
};

module.exports = {
  createStandard,
  getAllStandards,
  getStandardById,
  updateStandard,
  deleteStandard,
};