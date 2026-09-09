const express = require("express");

const authController = require("./auth.controller");

const validate = require("../../middleware/validate");

const { loginSchema } = require("./auth.validation");

const authenticate = require("../../middleware/authenticate");

const authorize = require("../../middleware/authorize");

const permission = require("../../middleware/permission");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and authorization APIs
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid credentials
 */
router.post(
  "/login",
  validate(loginSchema),
  authController.login
);


/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post(
  "/refresh",
  authController.refresh
);


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post(
  "/logout",
  authController.logout
);


/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/me",
  authenticate,
  authController.getMe
);


/**
 * @swagger
 * /auth/test-role:
 *   get:
 *     summary: Test role-based authorization
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role authorization successful
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Role authorization failed
 */
router.get(
  "/test-role",
  authenticate,
  authorize("SUPER_ADMIN"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Role authorization successful",
      data: req.user,
    });
  }
);


/**
 * @swagger
 * /auth/test-permission:
 *   get:
 *     summary: Test permission-based authorization
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permission authorization successful
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission authorization failed
 */
router.get(
  "/test-permission",
  authenticate,
  permission("user.read"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Permission authorization successful",
      data: req.user,
    });
  }
);


module.exports = router;