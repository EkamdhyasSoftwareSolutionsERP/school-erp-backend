const express = require("express");

const divisionController = require("./division.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const validate = require("../../middleware/validate");

const {
  createDivisionSchema,
  updateDivisionSchema,
} = require("./division.validation");

const router = express.Router();


// Create Division
router.post(
  "/",
  authenticate,
  permission("division.create"),
  validate(createDivisionSchema),
  divisionController.createDivision
);


// Get All Divisions
router.get(
  "/",
  authenticate,
  permission("division.read"),
  divisionController.getAllDivisions
);


// Get Division By ID
router.get(
  "/:id",
  authenticate,
  permission("division.read"),
  divisionController.getDivisionById
);


// Update Division
router.patch(
  "/:id",
  authenticate,
  permission("division.update"),
  validate(updateDivisionSchema),
  divisionController.updateDivision
);


// Delete Division
router.delete(
  "/:id",
  authenticate,
  permission("division.delete"),
  divisionController.deleteDivision
);


module.exports = router;