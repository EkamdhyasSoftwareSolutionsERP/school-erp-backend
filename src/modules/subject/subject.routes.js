const express = require("express");

const subjectController = require("./subject.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const validate = require("../../middleware/validate");

const {
  createSubjectSchema,
  updateSubjectSchema,
} = require("./subject.validation");

const router = express.Router();


// Create Subject
router.post(
  "/",
  authenticate,
  permission("subject.create"),
  validate(createSubjectSchema),
  subjectController.createSubject
);


// Get All Subjects
router.get(
  "/",
  authenticate,
  permission("subject.read"),
  subjectController.getAllSubjects
);


// Get Subject By ID
router.get(
  "/:id",
  authenticate,
  permission("subject.read"),
  subjectController.getSubjectById
);


// Update Subject
router.patch(
  "/:id",
  authenticate,
  permission("subject.update"),
  validate(updateSubjectSchema),
  subjectController.updateSubject
);


// Delete Subject
router.delete(
  "/:id",
  authenticate,
  permission("subject.delete"),
  subjectController.deleteSubject
);


module.exports = router;