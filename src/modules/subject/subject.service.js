const subjectRepository = require("./subject.repository");
const ApiError = require("../../common/ApiError");

// Create Subject
const createSubject = async (subjectData, schoolIds) => {
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

  const {
    name,
    code,
  } = subjectData;

  // Check duplicate subject name within authorized school
  const existingSubject =
    await subjectRepository.getSubjectBySchoolAndName(
      schoolId,
      name
    );

  if (existingSubject) {
    throw new ApiError(
      409,
      "Subject name already exists for this school"
    );
  }

  // Check duplicate subject code within authorized school
  const existingCode =
    await subjectRepository.getSubjectBySchoolAndCode(
      schoolId,
      code
    );

  if (existingCode) {
    throw new ApiError(
      409,
      "Subject code already exists for this school"
    );
  }

  return await subjectRepository.createSubject(
    {
      ...subjectData,
      school_id: schoolId,
    }
  );
};


// Get All Subjects
const getAllSubjects = async (schoolIds) => {
  if (!schoolIds || schoolIds.length === 0) {
    throw new ApiError(
      403,
      "No authorized school context found"
    );
  }

  return await subjectRepository.getAllSubjects(
    schoolIds
  );
};


// Get Subject By ID
const getSubjectById = async (id, schoolIds) => {
  if (!schoolIds || schoolIds.length === 0) {
    throw new ApiError(
      403,
      "No authorized school context found"
    );
  }

  const subject =
    await subjectRepository.getSubjectById(
      id,
      schoolIds
    );

  if (!subject) {
    throw new ApiError(
      404,
      "Subject not found"
    );
  }

  return subject;
};


// Update Subject
const updateSubject = async (
  id,
  subjectData,
  schoolIds
) => {
  if (!schoolIds || schoolIds.length === 0) {
    throw new ApiError(
      403,
      "No authorized school context found"
    );
  }

  const subject =
    await subjectRepository.getSubjectById(
      id,
      schoolIds
    );

  if (!subject) {
    throw new ApiError(
      404,
      "Subject not found"
    );
  }

  // Check duplicate name if changed
  if (
    subjectData.name &&
    subjectData.name !== subject.name
  ) {
    const existingSubject =
      await subjectRepository.getSubjectBySchoolAndName(
        subject.school_id,
        subjectData.name
      );

    if (existingSubject) {
      throw new ApiError(
        409,
        "Subject name already exists for this school"
      );
    }
  }

  // Check duplicate code if changed
  if (
    subjectData.code &&
    subjectData.code !== subject.code
  ) {
    const existingCode =
      await subjectRepository.getSubjectBySchoolAndCode(
        subject.school_id,
        subjectData.code
      );

    if (existingCode) {
      throw new ApiError(
        409,
        "Subject code already exists for this school"
      );
    }
  }

  return await subjectRepository.updateSubject(
    id,
    subjectData,
    schoolIds
  );
};


// Delete Subject
const deleteSubject = async (id, schoolIds) => {
  if (!schoolIds || schoolIds.length === 0) {
    throw new ApiError(
      403,
      "No authorized school context found"
    );
  }

  const subject =
    await subjectRepository.deleteSubject(
      id,
      schoolIds
    );

  if (!subject) {
    throw new ApiError(
      404,
      "Subject not found"
    );
  }

  return subject;
};


module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};