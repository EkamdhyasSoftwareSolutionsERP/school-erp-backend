const db = require("../../config/dataBase");


// Create Audit Log
const createAuditLog = async (auditData) => {
  const {
    user_id,
    school_id,
    action,
    entity_type,
    entity_id,
    old_data,
    new_data,
    ip_address,
  } = auditData;

  const query = `
    INSERT INTO audit_logs (
      user_id,
      school_id,
      action,
      entity_type,
      entity_id,
      old_data,
      new_data,
      ip_address
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [
    user_id || null,
    school_id || null,
    action,
    entity_type,
    entity_id || null,
    old_data || null,
    new_data || null,
    ip_address || null,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Get All Audit Logs
const getAllAuditLogs = async () => {
  const query = `
    SELECT
      audit_logs.*,

      users.email AS user_email,

      schools.name AS school_name

    FROM audit_logs

    LEFT JOIN users
      ON audit_logs.user_id = users.id

    LEFT JOIN schools
      ON audit_logs.school_id = schools.id

    ORDER BY audit_logs.created_at DESC
  `;

  const result = await db.query(query);

  return result.rows;
};


// Get Audit Log By ID
const getAuditLogById = async (id) => {
  const query = `
    SELECT
      audit_logs.*,

      users.email AS user_email,

      schools.name AS school_name

    FROM audit_logs

    LEFT JOIN users
      ON audit_logs.user_id = users.id

    LEFT JOIN schools
      ON audit_logs.school_id = schools.id

    WHERE audit_logs.id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


module.exports = {
  createAuditLog,
  getAllAuditLogs,
  getAuditLogById,
};