const express = require("express");

const schoolController =
  require("./school.controller");

const authenticate =
  require("../../middleware/authenticate");

const permission =
  require("../../middleware/permission");

const validate =
  require("../../middleware/validate");

const {
  createSchoolSchema,
  updateSchoolSchema,
} = require("./school.validation");

const router = express.Router();


// Create School
router.post(
  "/",
  authenticate,
  permission("school.create"),
  validate(createSchoolSchema),
  schoolController.createSchool
);


// Get All Schools
router.get(
  "/",
  authenticate,
  permission("school.read"),
  schoolController.getAllSchools
);


// Get School By ID
router.get(
  "/:id",
  authenticate,
  permission("school.read"),
  schoolController.getSchoolById
);


// Update School
router.patch(
  "/:id",
  authenticate,
  permission("school.update"),
  validate(updateSchoolSchema),
  schoolController.updateSchool
);


// Delete School
router.delete(
  "/:id",
  authenticate,
  permission("school.delete"),
  schoolController.deleteSchool
);


module.exports = router;