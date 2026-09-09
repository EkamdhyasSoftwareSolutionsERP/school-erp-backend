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


/**
 * @swagger
 * tags:
 *   name: Divisions
 *   description: Division management APIs
 */


/**
 * @swagger
 * /divisions:
 *   post:
 *     summary: Create a new division
 *     tags: [Divisions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - standard_id
 *               - academic_year_id
 *               - name
 *               - code
 *             properties:
 *               standard_id:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               academic_year_id:
 *                 type: string
 *                 format: uuid
 *                 example: 223e4567-e89b-12d3-a456-426614174000
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: A
 *               code:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: DIV_A
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 40
 *     responses:
 *       201:
 *         description: Division created successfully
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
  permission("division.create"),
  validate(createDivisionSchema),
  divisionController.createDivision
);


/**
 * @swagger
 * /divisions:
 *   get:
 *     summary: Get all divisions
 *     tags: [Divisions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Divisions fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("division.read"),
  divisionController.getAllDivisions
);


/**
 * @swagger
 * /divisions/{id}:
 *   get:
 *     summary: Get division by ID
 *     tags: [Divisions]
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
 *         description: Division fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Division not found
 */
router.get(
  "/:id",
  authenticate,
  permission("division.read"),
  divisionController.getDivisionById
);


/**
 * @swagger
 * /divisions/{id}:
 *   patch:
 *     summary: Update division
 *     tags: [Divisions]
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
 *                 maxLength: 50
 *                 example: B
 *               code:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: DIV_B
 *               capacity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 45
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Division updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Division not found
 */
router.patch(
  "/:id",
  authenticate,
  permission("division.update"),
  validate(updateDivisionSchema),
  divisionController.updateDivision
);


/**
 * @swagger
 * /divisions/{id}:
 *   delete:
 *     summary: Delete division
 *     tags: [Divisions]
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
 *         description: Division deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Division not found
 */
router.delete(
  "/:id",
  authenticate,
  permission("division.delete"),
  divisionController.deleteDivision
);


module.exports = router;