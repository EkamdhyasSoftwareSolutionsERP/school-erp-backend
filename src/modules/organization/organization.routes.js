const express = require("express");

const organizationController =
  require("./organization.controller");

const authenticate =
  require("../../middleware/authenticate");

const permission =
  require("../../middleware/permission");

const validate =
  require("../../middleware/validate");

const {
  createOrganizationSchema,
  updateOrganizationSchema,
} = require("./organization.validation");

const router = express.Router();


// Create Organization
router.post(
  "/",
  authenticate,
  permission("organization.create"),
  validate(createOrganizationSchema),
  organizationController.createOrganization
);


// Get All Organizations
router.get(
  "/",
  authenticate,
  permission("organization.read"),
  organizationController.getAllOrganizations
);


// Get Organization By ID
router.get(
  "/:id",
  authenticate,
  permission("organization.read"),
  organizationController.getOrganizationById
);


// Update Organization
router.patch(
  "/:id",
  authenticate,
  permission("organization.update"),
  validate(updateOrganizationSchema),
  organizationController.updateOrganization
);


// Delete Organization
router.delete(
  "/:id",
  authenticate,
  permission("organization.delete"),
  organizationController.deleteOrganization
);


module.exports = router;