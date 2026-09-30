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
const getAllDivisions = async (schoolIds) => {
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

    WHERE standards.school_id = ANY($1::uuid[])
      AND academic_years.school_id = ANY($1::uuid[])

    ORDER BY
      standards.display_order ASC,
      divisions.name ASC
  `;

  const result = await db.query(query, [schoolIds]);

  return result.rows;
};


// Get Division By ID
const getDivisionById = async (id, schoolIds) => {
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
      AND standards.school_id = ANY($2::uuid[])
      AND academic_years.school_id = ANY($2::uuid[])
  `;

  const result = await db.query(query, [id, schoolIds]);

  return result.rows[0];
};


// Get Standard By ID And School
const getStandardByIdAndSchool = async (
  standardId,
  schoolId
) => {
  const query = `
    SELECT *
    FROM standards
    WHERE id = $1
      AND school_id = $2
  `;

  const result = await db.query(query, [
    standardId,
    schoolId,
  ]);

  return result.rows[0];
};


// Get Academic Year By ID And School
const getAcademicYearByIdAndSchool = async (
  academicYearId,
  schoolId
) => {
  const query = `
    SELECT *
    FROM academic_years
    WHERE id = $1
      AND school_id = $2
  `;

  const result = await db.query(query, [
    academicYearId,
    schoolId,
  ]);

  return result.rows[0];
};


// Get Division By Standard, Academic Year And Name
const getDivisionByStandardAcademicYearAndName = async (
  standardId,
  academicYearId,
  name,
  schoolId
) => {
  const query = `
    SELECT
      divisions.*
    FROM divisions

    INNER JOIN standards
      ON divisions.standard_id = standards.id

    INNER JOIN academic_years
      ON divisions.academic_year_id = academic_years.id

    WHERE divisions.standard_id = $1
      AND divisions.academic_year_id = $2
      AND divisions.name = $3
      AND standards.school_id = $4
      AND academic_years.school_id = $4
  `;

  const result = await db.query(query, [
    standardId,
    academicYearId,
    name,
    schoolId,
  ]);

  return result.rows[0];
};


// Get Division By Standard, Academic Year And Code
const getDivisionByStandardAcademicYearAndCode = async (
  standardId,
  academicYearId,
  code,
  schoolId
) => {
  const query = `
    SELECT
      divisions.*
    FROM divisions

    INNER JOIN standards
      ON divisions.standard_id = standards.id

    INNER JOIN academic_years
      ON divisions.academic_year_id = academic_years.id

    WHERE divisions.standard_id = $1
      AND divisions.academic_year_id = $2
      AND divisions.code = $3
      AND standards.school_id = $4
      AND academic_years.school_id = $4
  `;

  const result = await db.query(query, [
    standardId,
    academicYearId,
    code,
    schoolId,
  ]);

  return result.rows[0];
};


// Update Division
const updateDivision = async (
  id,
  divisionData,
  schoolIds
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
      AND EXISTS (
        SELECT 1
        FROM standards
        WHERE standards.id = divisions.standard_id
          AND standards.school_id = ANY($6::uuid[])
      )
      AND EXISTS (
        SELECT 1
        FROM academic_years
        WHERE academic_years.id = divisions.academic_year_id
          AND academic_years.school_id = ANY($6::uuid[])
      )
    RETURNING *
  `;

  const values = [
    name,
    code,
    capacity,
    is_active,
    id,
    schoolIds,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Delete Division
const deleteDivision = async (
  id,
  schoolIds
) => {
  const query = `
    DELETE FROM divisions
    WHERE id = $1
      AND EXISTS (
        SELECT 1
        FROM standards
        WHERE standards.id = divisions.standard_id
          AND standards.school_id = ANY($2::uuid[])
      )
      AND EXISTS (
        SELECT 1
        FROM academic_years
        WHERE academic_years.id = divisions.academic_year_id
          AND academic_years.school_id = ANY($2::uuid[])
      )
    RETURNING *
  `;

  const result = await db.query(query, [
    id,
    schoolIds,
  ]);

  return result.rows[0];
};


module.exports = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  getStandardByIdAndSchool,
  getAcademicYearByIdAndSchool,
  getDivisionByStandardAcademicYearAndName,
  getDivisionByStandardAcademicYearAndCode,
  updateDivision,
  deleteDivision,
};