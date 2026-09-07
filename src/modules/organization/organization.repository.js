const db = require("../../config/dataBase");

const createOrganization = async (name, code) => {
  const query = `
    INSERT INTO organizations (
      name,
      code
    )
    VALUES ($1, $2)
    RETURNING *
  `;

  const result = await db.query(query, [name, code]);

  return result.rows[0];
};

const getAllOrganizations = async () => {
  const query = `
    SELECT *
    FROM organizations
    ORDER BY created_at DESC
  `;

  const result = await db.query(query);

  return result.rows;
};

const getOrganizationById = async (id) => {
  const query = `
    SELECT *
    FROM organizations
    WHERE id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const getOrganizationByCode = async (code) => {
  const query = `
    SELECT *
    FROM organizations
    WHERE code = $1
  `;

  const result = await db.query(query, [code]);

  return result.rows[0];
};

const updateOrganization = async (
  id,
  name,
  code,
  isActive
) => {
  const query = `
    UPDATE organizations
    SET
      name = COALESCE($1, name),
      code = COALESCE($2, code),
      is_active = COALESCE($3, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *
  `;

  const result = await db.query(
    query,
    [name, code, isActive, id]
  );

  return result.rows[0];
};

const deleteOrganization = async (id) => {
  const query = `
    DELETE FROM organizations
    WHERE id = $1
    RETURNING *
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  getOrganizationByCode,
  updateOrganization,
  deleteOrganization,
};