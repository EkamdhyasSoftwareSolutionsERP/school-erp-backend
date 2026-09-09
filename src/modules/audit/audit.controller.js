const auditService = require("./audit.service");


// Get All Audit Logs
const getAllAuditLogs = async (req, res, next) => {
  try {
    const auditLogs =
      await auditService.getAllAuditLogs();

    res.status(200).json({
      success: true,
      message: "Audit logs fetched successfully",
      data: auditLogs,
    });
  } catch (error) {
    next(error);
  }
};


// Get Audit Log By ID
const getAuditLogById = async (req, res, next) => {
  try {
    const auditLog =
      await auditService.getAuditLogById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: "Audit log fetched successfully",
      data: auditLog,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllAuditLogs,
  getAuditLogById,
};