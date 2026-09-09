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


/**
 * @swagger
 * tags:
 *   name: Academic Years
 *   description: Academic year management APIs
 */


/**
 * @swagger
 * /academic-years:
 *   post:
 *     summary: Create a new academic year
 *     tags: [Academic Years]
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
 *               - start_date
 *               - end_date
 *             properties:
 *               school_id:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               name:
 *                 type: string
 *                 maxLength: 20
 *                 example: "2026-2027"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-01"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2027-05-31"
 *               is_current:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *     responses:
 *       201:
 *         description: Academic year created successfully
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
  permission("academic_year.create"),
  validate(createAcademicYearSchema),
  academicYearController.createAcademicYear
);


/**
 * @swagger
 * /academic-years:
 *   get:
 *     summary: Get all academic years
 *     tags: [Academic Years]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Academic years fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("academic_year.read"),
  academicYearController.getAllAcademicYears
);


/**
 * @swagger
 * /academic-years/{id}:
 *   get:
 *     summary: Get academic year by ID
 *     tags: [Academic Years]
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
 *         description: Academic year fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Academic year not found
 */
router.get(
  "/:id",
  authenticate,
  permission("academic_year.read"),
  academicYearController.getAcademicYearById
);


/**
 * @swagger
 * /academic-years/{id}:
 *   patch:
 *     summary: Update academic year
 *     tags: [Academic Years]
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
 *                 maxLength: 20
 *                 example: "2026-2027"
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-01"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2027-05-31"
 *               is_current:
 *                 type: boolean
 *                 example: true
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Academic year updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Academic year not found
 */
router.patch(
  "/:id",
  authenticate,
  permission("academic_year.update"),
  validate(updateAcademicYearSchema),
  academicYearController.updateAcademicYear
);


/**
 * @swagger
 * /academic-years/{id}:
 *   delete:
 *     summary: Delete academic year
 *     tags: [Academic Years]
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
 *         description: Academic year deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Academic year not found
 */
router.delete(
  "/:id",
  authenticate,
  permission("academic_year.delete"),
  academicYearController.deleteAcademicYear
);


module.exports = router;