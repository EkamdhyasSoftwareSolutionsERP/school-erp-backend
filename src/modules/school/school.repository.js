const db = require("../../config/dataBase");

// Create School
const createSchool = async (schoolData) => {
  const {
    organization_id,
    name,
    code,
    email,
    phone,
    address,
    city,
    state,
    pincode,
  } = schoolData;

  const query = `
    INSERT INTO schools (
      organization_id,
      name,
      code,
      email,
      phone,
      address,
      city,
      state,
      pincode
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    organization_id,
    name,
    code,
    email,
    phone,
    address,
    city,
    state,
    pincode,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Get All Schools
const getAllSchools = async () => {
  const query = `
    SELECT
      schools.*,
      organizations.name AS organization_name,
      organizations.code AS organization_code
    FROM schools
    INNER JOIN organizations
      ON schools.organization_id = organizations.id
    ORDER BY schools.created_at DESC
  `;

  const result = await db.query(query);

  return result.rows;
};


// Get School By ID
const getSchoolById = async (id) => {
  const query = `
    SELECT
      schools.*,
      organizations.name AS organization_name,
      organizations.code AS organization_code
    FROM schools
    INNER JOIN organizations
      ON schools.organization_id = organizations.id
    WHERE schools.id = $1
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


// Get School By Code
const getSchoolByCode = async (code) => {
  const query = `
    SELECT *
    FROM schools
    WHERE code = $1
  `;

  const result = await db.query(query, [code]);

  return result.rows[0];
};


// Update School
const updateSchool = async (id, schoolData) => {
  const {
    name,
    code,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    is_active,
  } = schoolData;

  const query = `
    UPDATE schools
    SET
      name = COALESCE($1, name),
      code = COALESCE($2, code),
      email = COALESCE($3, email),
      phone = COALESCE($4, phone),
      address = COALESCE($5, address),
      city = COALESCE($6, city),
      state = COALESCE($7, state),
      pincode = COALESCE($8, pincode),
      is_active = COALESCE($9, is_active),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $10
    RETURNING *
  `;

  const values = [
    name,
    code,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    is_active,
    id,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};


// Delete School
const deleteSchool = async (id) => {
  const query = `
    DELETE FROM schools
    WHERE id = $1
    RETURNING *
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};


module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  getSchoolByCode,
  updateSchool,
  deleteSchool,
};