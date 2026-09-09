const express = require("express");

const auditController = require("./audit.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Audit Logs
 *   description: Audit log and system activity APIs
 */


/**
 * @swagger
 * /audit-logs:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Audit logs fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 */
router.get(
  "/",
  authenticate,
  permission("audit.read"),
  auditController.getAllAuditLogs
);


/**
 * @swagger
 * /audit-logs/{id}:
 *   get:
 *     summary: Get audit log by ID
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Audit log UUID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Audit log fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Audit log not found
 */
router.get(
  "/:id",
  authenticate,
  permission("audit.read"),
  auditController.getAuditLogById
);


module.exports = router;