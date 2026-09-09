const express = require("express");

const auditController = require("./audit.controller");

const authenticate = require("../../middleware/authenticate");

const permission = require("../../middleware/permission");

const router = express.Router();


// Get All Audit Logs
router.get(
  "/",
  authenticate,
  permission("audit.read"),
  auditController.getAllAuditLogs
);


// Get Audit Log By ID
router.get(
  "/:id",
  authenticate,
  permission("audit.read"),
  auditController.getAuditLogById
);


module.exports = router;