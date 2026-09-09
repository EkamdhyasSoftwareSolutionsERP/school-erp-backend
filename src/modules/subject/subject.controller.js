const subjectService = require("./subject.service");


// Create Subject
const createSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.createSubject(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};


// Get All Subjects
const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectService.getAllSubjects();

    res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};


// Get Subject By ID
const getSubjectById = async (req, res, next) => {
  try {
    const subject = await subjectService.getSubjectById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Subject fetched successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};


// Update Subject
const updateSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.updateSubject(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};


// Delete Subject
const deleteSubject = async (req, res, next) => {
  try {
    const subject = await subjectService.deleteSubject(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
      data: subject,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};