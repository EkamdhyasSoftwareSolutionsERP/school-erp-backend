const db = require("../../config/dataBase");


// Create Standard
const createStandard = async (standardData) => {
  const {
    school_id,
    name,
    code,
    display_order,
  } = standardData;

  const query = `
    INSERT INTO standards (
      school_id,
      name,
      code,
      display_order
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    school_id,
    name,
    code,
    display_order,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Get All Standards
const getAllStandards = async () => {
  const query = `
    SELECT
      standards.*,
      schools.name AS school_name,
      schools.code AS school_code
    FROM standards
    INNER JOIN schools
      ON standards.school_id = schools.id
    ORDER BY standards.display_order ASC
  `;

  const result = await db.query(query);

  return result.rows;
};


// Get Standard By ID
const getStandardById = async (id) => {
  const query = `
    SELECT
      standards.*,
      schools.name AS school_name,
      schools.code AS school_code
    FROM standards
    INNER JOIN schools
      ON standards.school_id = schools.id
    WHERE standards.id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


// Get Standard By School And Name
const getStandardBySchoolAndName = async (
  schoolId,
  name
) => {
  const query = `
    SELECT *
    FROM standards
    WHERE school_id = $1
      AND name = $2
  `;

  const result = await db.query(query, [
    schoolId,
    name,
  ]);

  return result.rows[0];
};


// Get Standard By School And Code
const getStandardBySchoolAndCode = async (
  schoolId,
  code
) => {
  const query = `
    SELECT *
    FROM standards
    WHERE school_id = $1
      AND code = $2
  `;

  const result = await db.query(query, [
    schoolId,
    code,
  ]);

  return result.rows[0];
};


// Update Standard
const updateStandard = async (
  id,
  standardData
) => {
  const {
    name,
    code,
    display_order,
    is_active,
  } = standardData;

  const query = `
    UPDATE standards
    SET
      name = COALESCE($1, name),
      code = COALESCE($2, code),
      display_order = COALESCE($3, display_order),
      is_active = COALESCE($4, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
  `;

  const values = [
    name,
    code,
    display_order,
    is_active,
    id,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Delete Standard
const deleteStandard = async (id) => {
  const query = `
    DELETE FROM standards
    WHERE id = $1
    RETURNING *
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


module.exports = {
  createStandard,
  getAllStandards,
  getStandardById,
  getStandardBySchoolAndName,
  getStandardBySchoolAndCode,
  updateStandard,
  deleteStandard,
};  