const express = require("express");

const permissionController = require("./permission.controller");
const authenticate = require("../../middleware/authenticate");
const permission = require("../../middleware/permission");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management APIs
 */

/**
 * @swagger
 * /api/v1/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("permission.read"),
  permissionController.getAllPermissions
);

/**
 * @swagger
 * /api/v1/permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Permission UUID
 *     responses:
 *       200:
 *         description: Permission fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Permission not found
 */
router.get(
  "/:id",
  authenticate,
  permission("permission.read"),
  permissionController.getPermissionById
);

module.exports = router;