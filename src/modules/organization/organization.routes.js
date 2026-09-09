const express = require("express");

const organizationController = require("./organization.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const validate = require("../../middleware/validate");

const {
  createOrganizationSchema,
  updateOrganizationSchema,
} = require("./organization.validation");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management APIs
 */


/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *                 example: ABC Education Group
 *               code:
 *                 type: string
 *                 maxLength: 100
 *                 example: ABC_EDU
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.post(
  "/",
  authenticate,
  permission("organization.create"),
  validate(createOrganizationSchema),
  organizationController.createOrganization
);


/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizations fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("organization.read"),
  organizationController.getAllOrganizations
);


/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Organization fetched successfully
 *       404:
 *         description: Organization not found
 */
router.get(
  "/:id",
  authenticate,
  permission("organization.read"),
  organizationController.getOrganizationById
);


/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *                 example: ABC Education Group
 *               code:
 *                 type: string
 *                 maxLength: 100
 *                 example: ABC_EDU
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.patch(
  "/:id",
  authenticate,
  permission("organization.update"),
  validate(updateOrganizationSchema),
  organizationController.updateOrganization
);


/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Delete organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 */
router.delete(
  "/:id",
  authenticate,
  permission("organization.delete"),
  organizationController.deleteOrganization
);


module.exports = router;