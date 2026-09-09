const auditRepository = require("./audit.repository");
const ApiError = require("../../common/ApiError");


// Create Audit Log
const createAuditLog = async (auditData) => {
  return await auditRepository.createAuditLog(auditData);
};


// Get All Audit Logs
const getAllAuditLogs = async () => {
  return await auditRepository.getAllAuditLogs();
};


// Get Audit Log By ID
const getAuditLogById = async (id) => {
  const auditLog =
    await auditRepository.getAuditLogById(id);

  if (!auditLog) {
    throw new ApiError(
      404,
      "Audit log not found"
    );
  }

  return auditLog;
};


module.exports = {
  createAuditLog,
  getAllAuditLogs,
  getAuditLogById,
};