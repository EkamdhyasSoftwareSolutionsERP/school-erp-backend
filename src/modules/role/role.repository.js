const db = require("../../config/dataBase");

const getAllRoles = async () => {
  const query = `
    SELECT
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
    FROM roles
    ORDER BY created_at DESC
  `;

  const result = await db.query(query);

  return result.rows;
};

const getRoleById = async (id) => {
  const query = `
    SELECT
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
    FROM roles
    WHERE id = $1
    LIMIT 1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const getRoleByName = async (name) => {
  const query = `
    SELECT
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
    FROM roles
    WHERE LOWER(name) = LOWER($1)
    LIMIT 1
  `;

  const result = await db.query(query, [name]);

  return result.rows[0];
};

const createRole = async ({ name, description }) => {
  const query = `
    INSERT INTO roles (
      name,
      description
    )
    VALUES ($1, $2)
    RETURNING
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
  `;

  const result = await db.query(query, [
    name,
    description || null,
  ]);

  return result.rows[0];
};

const updateRole = async (id, { name, description }) => {
  const query = `
    UPDATE roles
    SET
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
  `;

  const result = await db.query(query, [
    name || null,
    description !== undefined ? description : null,
    id,
  ]);

  return result.rows[0];
};

const updateRoleStatus = async (id, isActive) => {
  const query = `
    UPDATE roles
    SET
      is_active = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING
      id,
      name,
      description,
      is_active,
      created_at,
      updated_at
  `;

  const result = await db.query(query, [
    isActive,
    id,
  ]);

  return result.rows[0];
};

const deleteRole = async (id) => {
  const query = `
    DELETE FROM roles
    WHERE id = $1
    RETURNING id
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const getRolePermissions = async (roleId) => {
  const query = `
    SELECT
      p.id,
      p.name,
      p.description,
      p.created_at,
      p.updated_at
    FROM role_permissions rp
    INNER JOIN permissions p
      ON p.id = rp.permission_id
    WHERE rp.role_id = $1
    ORDER BY p.name ASC
  `;

  const result = await db.query(query, [roleId]);

  return result.rows;
};

const assignPermissionToRole = async (roleId, permissionId) => {
  const query = `
    INSERT INTO role_permissions (role_id, permission_id)
    VALUES ($1, $2)
    ON CONFLICT (role_id, permission_id) DO NOTHING
    RETURNING role_id, permission_id, created_at
  `;

  const result = await db.query(query, [roleId, permissionId]);

  return result.rows[0];
};

const removePermissionFromRole = async (roleId, permissionId) => {
  const query = `
    DELETE FROM role_permissions
    WHERE role_id = $1
      AND permission_id = $2
    RETURNING role_id, permission_id
  `;

  const result = await db.query(query, [roleId, permissionId]);

  return result.rows[0];
};

module.exports = {
  getAllRoles,
  getRoleById,
  getRoleByName,
  createRole,
  updateRole,
  updateRoleStatus,
  deleteRole,
  getRolePermissions,
  assignPermissionToRole,
  removePermissionFromRole,
};