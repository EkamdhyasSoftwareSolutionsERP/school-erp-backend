const express = require("express");

const roleController = require("./role.controller");

const validate = require("../../middleware/validate");

const validateParams = require("../../middleware/validateParams");

const {
  createRoleSchema,
  updateRoleSchema,
  updateRoleStatusSchema,
  assignPermissionSchema,
  rolePermissionParamsSchema,
  rolePermissionDeleteParamsSchema,
} = require("./role.validation");

const authenticate = require("../../middleware/authenticate");
const permission = require("../../middleware/permission");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management APIs
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("role.read"),
  roleController.getAllRoles
);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
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
 *         description: Role fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Role not found
 */
router.get(
  "/:id",
  authenticate,
  permission("role.read"),
  roleController.getRoleById
);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 100
 *                 example: TEACHER
 *               description:
 *                 type: string
 *                 example: Teacher role
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       409:
 *         description: Role already exists
 */
router.post(
  "/",
  authenticate,
  permission("role.create"),
  validate(createRoleSchema),
  roleController.createRole
);

/**
 * @swagger
 * /roles/{id}:
 *   patch:
 *     summary: Update role
 *     tags: [Roles]
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
 *                 maxLength: 100
 *                 example: SENIOR_TEACHER
 *               description:
 *                 type: string
 *                 example: Senior teacher role
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Role not found
 *       409:
 *         description: Role already exists
 */
router.patch(
  "/:id",
  authenticate,
  permission("role.update"),
  validate(updateRoleSchema),
  roleController.updateRole
);

/**
 * @swagger
 * /roles/{id}/status:
 *   patch:
 *     summary: Update role active status
 *     tags: [Roles]
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
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Role status updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Role not found
 */
router.patch(
  "/:id/status",
  authenticate,
  permission("role.update"),
  validate(updateRoleStatusSchema),
  roleController.updateRoleStatus
);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Roles]
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
 *         description: Role deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Role not found
 */
router.delete(
  "/:id",
  authenticate,
  permission("role.delete"),
  roleController.deleteRole
);

/**
 * @swagger
 * /roles/{id}/permissions:
 *   get:
 *     summary: Get permissions assigned to a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role UUID
 *     responses:
 *       200:
 *         description: Role permissions fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Role not found
 */
router.get(
  "/:id/permissions",
  authenticate,
  permission("role.read"),
  validateParams(rolePermissionParamsSchema),
  roleController.getRolePermissions
);

/**
 * @swagger
 * /roles/{id}/permissions:
 *   post:
 *     summary: Assign a permission to a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permissionId
 *             properties:
 *               permissionId:
 *                 type: string
 *                 format: uuid
 *                 example: 4c2b935d-6fa2-4c64-82ce-ff1f47fc7fee
 *     responses:
 *       201:
 *         description: Permission assigned to role successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Role or permission not found
 *       409:
 *         description: Permission already assigned to role
 */
router.post(
  "/:id/permissions",
  authenticate,
  permission("role.update"),
  validateParams(rolePermissionParamsSchema),
  validate(assignPermissionSchema),
  roleController.assignPermissionToRole
);

/**
 * @swagger
 * /roles/{id}/permissions/{permissionId}:
 *   delete:
 *     summary: Remove a permission from a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role UUID
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Permission UUID
 *     responses:
 *       200:
 *         description: Permission removed from role successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Role, permission, or assignment not found
 */
router.delete(
  "/:id/permissions/:permissionId",
  authenticate,
  permission("role.update"),
  validateParams(rolePermissionDeleteParamsSchema),
  roleController.removePermissionFromRole
);

module.exports = router;