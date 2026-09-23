const db = require("../../config/dataBase");

// Create Academic Year
const createAcademicYear = async (academicYearData) => {
  const {
    school_id,
    name,
    start_date,
    end_date,
    is_current,
  } = academicYearData;

  const query = `
    INSERT INTO academic_years (
      school_id,
      name,
      start_date,
      end_date,
      is_current
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    school_id,
    name,
    start_date,
    end_date,
    is_current,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Get All Academic Years
const getAllAcademicYears = async (schoolIds) => {
  const query = `
    SELECT
      academic_years.*,
      schools.name AS school_name,
      schools.code AS school_code
    FROM academic_years
    INNER JOIN schools
      ON academic_years.school_id = schools.id
    WHERE academic_years.school_id = ANY($1::uuid[])
    ORDER BY academic_years.start_date DESC
  `;

  const result = await db.query(query, [schoolIds]);

  return result.rows;
};


// Get Academic Year By ID
const getAcademicYearById = async (id, schoolIds) => {
  const query = `
    SELECT
      academic_years.*,
      schools.name AS school_name,
      schools.code AS school_code
    FROM academic_years
    INNER JOIN schools
      ON academic_years.school_id = schools.id
    WHERE academic_years.id = $1
      AND academic_years.school_id = ANY($2::uuid[])
  `;

  const result = await db.query(query, [id, schoolIds]);

  return result.rows[0];
};


// Get Academic Year By School and Name
const getAcademicYearBySchoolAndName = async (
  schoolId,
  name
) => {
  const query = `
    SELECT *
    FROM academic_years
    WHERE school_id = $1
      AND name = $2
  `;

  const result = await db.query(query, [
    schoolId,
    name,
  ]);

  return result.rows[0];
};


// Get Current Academic Year By School
const getCurrentAcademicYearBySchool = async (
  schoolId
) => {
  const query = `
    SELECT *
    FROM academic_years
    WHERE school_id = $1
      AND is_current = true
  `;

  const result = await db.query(query, [schoolId]);

  return result.rows[0];
};


// Update Academic Year
const updateAcademicYear = async (
  id,
  academicYearData,
  schoolIds
) => {
  const {
    name,
    start_date,
    end_date,
    is_current,
    is_active,
  } = academicYearData;

  const query = `
    UPDATE academic_years
    SET
      name = COALESCE($1, name),
      start_date = COALESCE($2, start_date),
      end_date = COALESCE($3, end_date),
      is_current = COALESCE($4, is_current),
      is_active = COALESCE($5, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
      AND school_id = ANY($7::uuid[])
    RETURNING *
  `;

  const values = [
    name,
    start_date,
    end_date,
    is_current,
    is_active,
    id,
    schoolIds,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Set Current Academic Year to False
const resetCurrentAcademicYear = async (
  schoolId
) => {
  const query = `
    UPDATE academic_years
    SET
      is_current = false,
      updated_at = CURRENT_TIMESTAMP
    WHERE school_id = $1
      AND is_current = true
  `;

  await db.query(query, [schoolId]);
};


// Delete Academic Year
const deleteAcademicYear = async (id, schoolIds) => {
  const query = `
    DELETE FROM academic_years
    WHERE id = $1
      AND school_id = ANY($2::uuid[])
    RETURNING *
  `;

  const result = await db.query(query, [
    id,
    schoolIds,
  ]);

  return result.rows[0];
};


module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  getAcademicYearBySchoolAndName,
  getCurrentAcademicYearBySchool,
  updateAcademicYear,
  resetCurrentAcademicYear,
  deleteAcademicYear,
};