const subjectRepository = require("./subject.repository");
const ApiError = require("../../common/ApiError");


// Create Subject
const createSubject = async (subjectData) => {
  const {
    school_id,
    name,
    code,
  } = subjectData;

  // Check duplicate subject name
  const existingSubject =
    await subjectRepository.getSubjectBySchoolAndName(
      school_id,
      name
    );

  if (existingSubject) {
    throw new ApiError(
      409,
      "Subject name already exists for this school"
    );
  }

  // Check duplicate subject code
  const existingCode =
    await subjectRepository.getSubjectBySchoolAndCode(
      school_id,
      code
    );

  if (existingCode) {
    throw new ApiError(
      409,
      "Subject code already exists for this school"
    );
  }

  return await subjectRepository.createSubject(subjectData);
};


// Get All Subjects
const getAllSubjects = async () => {
  return await subjectRepository.getAllSubjects();
};


// Get Subject By ID
const getSubjectById = async (id) => {
  const subject =
    await subjectRepository.getSubjectById(id);

  if (!subject) {
    throw new ApiError(
      404,
      "Subject not found"
    );
  }

  return subject;
};


// Update Subject
const updateSubject = async (id, subjectData) => {
  const subject =
    await subjectRepository.getSubjectById(id);

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
    subjectData
  );
};


// Delete Subject
const deleteSubject = async (id) => {
  const subject =
    await subjectRepository.deleteSubject(id);

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