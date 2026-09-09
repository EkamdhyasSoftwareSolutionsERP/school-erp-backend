const express = require("express");

const schoolController = require("./school.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const validate = require("../../middleware/validate");

const {
  createSchoolSchema,
  updateSchoolSchema,
} = require("./school.validation");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: School management APIs
 */


/**
 * @swagger
 * /schools:
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organization_id
 *               - name
 *               - code
 *             properties:
 *               organization_id:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               name:
 *                 type: string
 *                 maxLength: 255
 *                 example: ABC High School
 *               code:
 *                 type: string
 *                 maxLength: 100
 *                 example: ABC_HS
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 255
 *                 example: info@abcschool.com
 *               phone:
 *                 type: string
 *                 maxLength: 20
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Main Road
 *               city:
 *                 type: string
 *                 maxLength: 100
 *                 example: Pune
 *               state:
 *                 type: string
 *                 maxLength: 100
 *                 example: Maharashtra
 *               pincode:
 *                 type: string
 *                 maxLength: 10
 *                 example: "411001"
 *     responses:
 *       201:
 *         description: School created successfully
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
  permission("school.create"),
  validate(createSchoolSchema),
  schoolController.createSchool
);


/**
 * @swagger
 * /schools:
 *   get:
 *     summary: Get all schools
 *     tags: [Schools]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Schools fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("school.read"),
  schoolController.getAllSchools
);


/**
 * @swagger
 * /schools/{id}:
 *   get:
 *     summary: Get school by ID
 *     tags: [Schools]
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
 *         description: School fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: School not found
 */
router.get(
  "/:id",
  authenticate,
  permission("school.read"),
  schoolController.getSchoolById
);


/**
 * @swagger
 * /schools/{id}:
 *   patch:
 *     summary: Update school
 *     tags: [Schools]
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
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *                 example: ABC High School Updated
 *               code:
 *                 type: string
 *                 maxLength: 100
 *                 example: ABC_HS_UPDATED
 *               email:
 *                 type: string
 *                 format: email
 *                 example: updated@abcschool.com
 *               phone:
 *                 type: string
 *                 maxLength: 20
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Updated Main Road
 *               city:
 *                 type: string
 *                 maxLength: 100
 *                 example: Pune
 *               state:
 *                 type: string
 *                 maxLength: 100
 *                 example: Maharashtra
 *               pincode:
 *                 type: string
 *                 maxLength: 10
 *                 example: "411001"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: School updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: School not found
 */
router.patch(
  "/:id",
  authenticate,
  permission("school.update"),
  validate(updateSchoolSchema),
  schoolController.updateSchool
);


/**
 * @swagger
 * /schools/{id}:
 *   delete:
 *     summary: Delete school
 *     tags: [Schools]
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
 *         description: School deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: School not found
 */
router.delete(
  "/:id",
  authenticate,
  permission("school.delete"),
  schoolController.deleteSchool
);


module.exports = router;