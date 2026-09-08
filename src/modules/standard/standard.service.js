const standardRepository = require("./standard.repository");
const ApiError = require("../../common/ApiError");


// Create Standard
const createStandard = async (standardData) => {
  const {
    school_id,
    name,
    code,
  } = standardData;

  // Check duplicate standard name
  const existingStandard =
    await standardRepository.getStandardBySchoolAndName(
      school_id,
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
      school_id,
      code
    );

  if (existingCode) {
    throw new ApiError(
      409,
      "Standard code already exists for this school"
    );
  }

  return await standardRepository.createStandard(
    standardData
  );
};


// Get All Standards
const getAllStandards = async () => {
  return await standardRepository.getAllStandards();
};


// Get Standard By ID
const getStandardById = async (id) => {
  const standard =
    await standardRepository.getStandardById(id);

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
  standardData
) => {
  const standard =
    await standardRepository.getStandardById(id);

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
    standardData
  );
};


// Delete Standard
const deleteStandard = async (id) => {
  const standard =
    await standardRepository.deleteStandard(id);

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