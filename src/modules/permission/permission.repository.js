const db = require("../../config/dataBase");

const getAllPermissions = async () => {
  const query = `
    SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM permissions
    ORDER BY name ASC
  `;

  const result = await db.query(query);

  return result.rows;
};

const getPermissionById = async (id) => {
  const query = `
    SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM permissions
    WHERE id = $1
    LIMIT 1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const getPermissionByName = async (name) => {
  const query = `
    SELECT
      id,
      name,
      description,
      created_at,
      updated_at
    FROM permissions
    WHERE LOWER(name) = LOWER($1)
    LIMIT 1
  `;

  const result = await db.query(query, [name]);

  return result.rows[0];
};

module.exports = {
  getAllPermissions,
  getPermissionById,
  getPermissionByName,
};