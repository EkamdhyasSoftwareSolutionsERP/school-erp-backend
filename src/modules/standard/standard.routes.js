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


/**
 * @swagger
 * tags:
 *   name: Standards
 *   description: Standard management APIs
 */


/**
 * @swagger
 * /standards:
 *   post:
 *     summary: Create a new standard
 *     tags: [Standards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - school_id
 *               - name
 *               - code
 *               - display_order
 *             properties:
 *               school_id:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: Standard 1
 *               code:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: STD_1
 *               display_order:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *     responses:
 *       201:
 *         description: Standard created successfully
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
  permission("standard.create"),
  validate(createStandardSchema),
  standardController.createStandard
);


/**
 * @swagger
 * /standards:
 *   get:
 *     summary: Get all standards
 *     tags: [Standards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Standards fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("standard.read"),
  standardController.getAllStandards
);


/**
 * @swagger
 * /standards/{id}:
 *   get:
 *     summary: Get standard by ID
 *     tags: [Standards]
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
 *         description: Standard fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Standard not found
 */
router.get(
  "/:id",
  authenticate,
  permission("standard.read"),
  standardController.getStandardById
);


/**
 * @swagger
 * /standards/{id}:
 *   patch:
 *     summary: Update standard
 *     tags: [Standards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: Standard 1 Updated
 *               code:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: STD_1_UPDATED
 *               display_order:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Standard updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Standard not found
 */
router.patch(
  "/:id",
  authenticate,
  permission("standard.update"),
  validate(updateStandardSchema),
  standardController.updateStandard
);


/**
 * @swagger
 * /standards/{id}:
 *   delete:
 *     summary: Delete standard
 *     tags: [Standards]
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
 *         description: Standard deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Standard not found
 */
router.delete(
  "/:id",
  authenticate,
  permission("standard.delete"),
  standardController.deleteStandard
);


module.exports = router;