const express = require("express");

const academicYearController =
  require("./academicYear.controller");

const authenticate =
  require("../../middleware/authenticate");

const permission =
  require("../../middleware/permission");

const validate =
  require("../../middleware/validate");

const {
  createAcademicYearSchema,
  updateAcademicYearSchema,
} = require("./academicYear.validation");

const router = express.Router();


// Create Academic Year
router.post(
  "/",
  authenticate,
  permission("academic_year.create"),
  validate(createAcademicYearSchema),
  academicYearController.createAcademicYear
);


// Get All Academic Years
router.get(
  "/",
  authenticate,
  permission("academic_year.read"),
  academicYearController.getAllAcademicYears
);


// Get Academic Year By ID
router.get(
  "/:id",
  authenticate,
  permission("academic_year.read"),
  academicYearController.getAcademicYearById
);


// Update Academic Year
router.patch(
  "/:id",
  authenticate,
  permission("academic_year.update"),
  validate(updateAcademicYearSchema),
  academicYearController.updateAcademicYear
);


// Delete Academic Year
router.delete(
  "/:id",
  authenticate,
  permission("academic_year.delete"),
  academicYearController.deleteAcademicYear
);


module.exports = router;