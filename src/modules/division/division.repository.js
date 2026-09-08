const db = require("../../config/dataBase");

// Create Division
const createDivision = async (divisionData) => {
  const {
    standard_id,
    academic_year_id,
    name,
    code,
    capacity,
  } = divisionData;

  const query = `
    INSERT INTO divisions (
      standard_id,
      academic_year_id,
      name,
      code,
      capacity
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    standard_id,
    academic_year_id,
    name,
    code,
    capacity,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Get All Divisions
const getAllDivisions = async () => {
  const query = `
    SELECT
      divisions.*,

      standards.name AS standard_name,
      standards.code AS standard_code,

      academic_years.name AS academic_year_name

    FROM divisions

    INNER JOIN standards
      ON divisions.standard_id = standards.id

    INNER JOIN academic_years
      ON divisions.academic_year_id = academic_years.id

    ORDER BY
      standards.display_order ASC,
      divisions.name ASC
  `;

  const result = await db.query(query);

  return result.rows;
};


// Get Division By ID
const getDivisionById = async (id) => {
  const query = `
    SELECT
      divisions.*,

      standards.name AS standard_name,
      standards.code AS standard_code,

      academic_years.name AS academic_year_name

    FROM divisions

    INNER JOIN standards
      ON divisions.standard_id = standards.id

    INNER JOIN academic_years
      ON divisions.academic_year_id = academic_years.id

    WHERE divisions.id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


// Get Division By Standard, Academic Year And Name
const getDivisionByStandardAcademicYearAndName = async (
  standardId,
  academicYearId,
  name
) => {
  const query = `
    SELECT *
    FROM divisions
    WHERE standard_id = $1
      AND academic_year_id = $2
      AND name = $3
  `;

  const result = await db.query(query, [
    standardId,
    academicYearId,
    name,
  ]);

  return result.rows[0];
};


// Get Division By Standard, Academic Year And Code
const getDivisionByStandardAcademicYearAndCode = async (
  standardId,
  academicYearId,
  code
) => {
  const query = `
    SELECT *
    FROM divisions
    WHERE standard_id = $1
      AND academic_year_id = $2
      AND code = $3
  `;

  const result = await db.query(query, [
    standardId,
    academicYearId,
    code,
  ]);

  return result.rows[0];
};


// Update Division
const updateDivision = async (
  id,
  divisionData
) => {
  const {
    name,
    code,
    capacity,
    is_active,
  } = divisionData;

  const query = `
    UPDATE divisions
    SET
      name = COALESCE($1, name),
      code = COALESCE($2, code),
      capacity = COALESCE($3, capacity),
      is_active = COALESCE($4, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
  `;

  const values = [
    name,
    code,
    capacity,
    is_active,
    id,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Delete Division
const deleteDivision = async (id) => {
  const query = `
    DELETE FROM divisions
    WHERE id = $1
    RETURNING *
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


module.exports = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  getDivisionByStandardAcademicYearAndName,
  getDivisionByStandardAcademicYearAndCode,
  updateDivision,
  deleteDivision,
};