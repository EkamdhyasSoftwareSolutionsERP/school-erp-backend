const db = require("../../config/dataBase");

const getUserRoles = async (userId) => {
  const query = `
    SELECT r.name
    FROM user_roles ur
    INNER JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = $1
  `;

  const result = await db.query(query, [userId]);

  return result.rows.map((role) => role.name);
};

const getUserPermissions = async (userId) => {
  const query = `
    SELECT DISTINCT p.name
    FROM user_roles ur
    INNER JOIN role_permissions rp
      ON rp.role_id = ur.role_id
    INNER JOIN permissions p
      ON p.id = rp.permission_id
    WHERE ur.user_id = $1
  `;

  const result = await db.query(query, [userId]);

  return result.rows.map(
    (permission) => permission.name
  );
};

module.exports = {
  getUserRoles,
  getUserPermissions,
};