const express = require("express");

const subjectController = require("./subject.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const validate = require("../../middleware/validate");

const {
  createSubjectSchema,
  updateSubjectSchema,
} = require("./subject.validation");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Subject management APIs
 */


/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
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
 *             properties:
 *               school_id:
 *                 type: string
 *                 format: uuid
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: Mathematics
 *               code:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: MATH
 *               description:
 *                 type: string
 *                 example: Mathematics subject for students
 *     responses:
 *       201:
 *         description: Subject created successfully
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
  permission("subject.create"),
  validate(createSubjectSchema),
  subjectController.createSubject
);


/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subjects fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("subject.read"),
  subjectController.getAllSubjects
);


/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Get subject by ID
 *     tags: [Subjects]
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
 *         description: Subject fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Subject not found
 */
router.get(
  "/:id",
  authenticate,
  permission("subject.read"),
  subjectController.getSubjectById
);


/**
 * @swagger
 * /subjects/{id}:
 *   patch:
 *     summary: Update subject
 *     tags: [Subjects]
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
 *                 example: Mathematics Updated
 *               code:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 50
 *                 example: MATH_UPDATED
 *               description:
 *                 type: string
 *                 example: Updated mathematics subject description
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Subject not found
 */
router.patch(
  "/:id",
  authenticate,
  permission("subject.update"),
  validate(updateSubjectSchema),
  subjectController.updateSubject
);


/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     summary: Delete subject
 *     tags: [Subjects]
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
 *         description: Subject deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Subject not found
 */
router.delete(
  "/:id",
  authenticate,
  permission("subject.delete"),
  subjectController.deleteSubject
);


module.exports = router;