const db = require("../../config/dataBase");

// Create Subject
const createSubject = async (subjectData) => {
  const {
    school_id,
    name,
    code,
    description,
  } = subjectData;

  const query = `
    INSERT INTO subjects (
      school_id,
      name,
      code,
      description
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    school_id,
    name,
    code,
    description,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Get All Subjects
const getAllSubjects = async () => {
  const query = `
    SELECT
      subjects.*,

      schools.name AS school_name,
      schools.code AS school_code

    FROM subjects

    INNER JOIN schools
      ON subjects.school_id = schools.id

    ORDER BY
      schools.name ASC,
      subjects.name ASC
  `;

  const result = await db.query(query);

  return result.rows;
};


// Get Subject By ID
const getSubjectById = async (id) => {
  const query = `
    SELECT
      subjects.*,

      schools.name AS school_name,
      schools.code AS school_code

    FROM subjects

    INNER JOIN schools
      ON subjects.school_id = schools.id

    WHERE subjects.id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


// Get Subject By School And Name
const getSubjectBySchoolAndName = async (
  schoolId,
  name
) => {
  const query = `
    SELECT *
    FROM subjects
    WHERE school_id = $1
      AND name = $2
  `;

  const result = await db.query(query, [
    schoolId,
    name,
  ]);

  return result.rows[0];
};


// Get Subject By School And Code
const getSubjectBySchoolAndCode = async (
  schoolId,
  code
) => {
  const query = `
    SELECT *
    FROM subjects
    WHERE school_id = $1
      AND code = $2
  `;

  const result = await db.query(query, [
    schoolId,
    code,
  ]);

  return result.rows[0];
};


// Update Subject
const updateSubject = async (
  id,
  subjectData
) => {
  const {
    name,
    code,
    description,
    is_active,
  } = subjectData;

  const query = `
    UPDATE subjects
    SET
      name = COALESCE($1, name),
      code = COALESCE($2, code),
      description = COALESCE($3, description),
      is_active = COALESCE($4, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
  `;

  const values = [
    name,
    code,
    description,
    is_active,
    id,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Delete Subject
const deleteSubject = async (id) => {
  const query = `
    DELETE FROM subjects
    WHERE id = $1
    RETURNING *
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  getSubjectBySchoolAndName,
  getSubjectBySchoolAndCode,
  updateSubject,
  deleteSubject,
};