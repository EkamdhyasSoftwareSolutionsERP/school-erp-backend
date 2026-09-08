const express = require("express");

const standardController = require("./standard.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const validate = require("../../middleware/validate");

const {
  createStandardSchema,
  updateStandardSchema,
} = require("./standard.validation");

const router = express.Router();


// Create Standard
router.post(
  "/",
  authenticate,
  permission("standard.create"),
  validate(createStandardSchema),
  standardController.createStandard
);


// Get All Standards
router.get(
  "/",
  authenticate,
  permission("standard.read"),
  standardController.getAllStandards
);


// Get Standard By ID
router.get(
  "/:id",
  authenticate,
  permission("standard.read"),
  standardController.getStandardById
);


// Update Standard
router.patch(
  "/:id",
  authenticate,
  permission("standard.update"),
  validate(updateStandardSchema),
  standardController.updateStandard
);


// Delete Standard
router.delete(
  "/:id",
  authenticate,
  permission("standard.delete"),
  standardController.deleteStandard
);


module.exports = router;