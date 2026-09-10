const db = require("../../config/dataBase");

const getAllUsers = async ({ search, isActive, limit, offset }) => {
  const values = [];
  const conditions = [];

  if (search) {
    values.push(`%${search}%`);
    conditions.push(
      `(u.name ILIKE $${values.length} OR u.email ILIKE $${values.length})`
    );
  }

  if (typeof isActive === "boolean") {
    values.push(isActive);
    conditions.push(`u.is_active = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM users u
    ${whereClause}
  `;

  const countResult = await db.query(countQuery, values);

  values.push(limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

  const query = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.is_active,
      u.last_login_at,
      u.created_at,
      u.updated_at,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', r.id,
            'name', r.name
          )
        ) FILTER (WHERE r.id IS NOT NULL),
        '[]'
      ) AS roles,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', s.id,
            'name', s.name
          )
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS schools

    FROM users u

    LEFT JOIN user_roles ur
      ON u.id = ur.user_id

    LEFT JOIN roles r
      ON ur.role_id = r.id

    LEFT JOIN user_schools us
      ON u.id = us.user_id

    LEFT JOIN schools s
      ON us.school_id = s.id

    ${whereClause}

    GROUP BY u.id

    ORDER BY u.created_at DESC

    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  const result = await db.query(query, values);

  return {
    rows: result.rows,
    total: Number(countResult.rows[0].total),
  };
};

const getUserById = async (id) => {
  const query = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.is_active,
      u.last_login_at,
      u.created_at,
      u.updated_at,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', r.id,
            'name', r.name
          )
        ) FILTER (WHERE r.id IS NOT NULL),
        '[]'
      ) AS roles,

      COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'id', s.id,
            'name', s.name
          )
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) AS schools

    FROM users u

    LEFT JOIN user_roles ur
      ON u.id = ur.user_id

    LEFT JOIN roles r
      ON ur.role_id = r.id

    LEFT JOIN user_schools us
      ON u.id = us.user_id

    LEFT JOIN schools s
      ON us.school_id = s.id

    WHERE u.id = $1

    GROUP BY u.id
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  const result = await db.query(query, [email]);

  return result.rows[0];
};

const createUser = async (
  name,
  email,
  passwordHash
) => {
  const query = `
    INSERT INTO users (
      name,
      email,
      password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      name,
      email,
      is_active,
      last_login_at,
      created_at,
      updated_at
  `;

  const result = await db.query(query, [
    name,
    email,
    passwordHash,
  ]);

  return result.rows[0];
};

const updateUser = async (
  id,
  name,
  email,
  passwordHash
) => {
  const query = `
    UPDATE users
    SET
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      password_hash = COALESCE($3, password_hash),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING
      id,
      name,
      email,
      is_active,
      last_login_at,
      created_at,
      updated_at
  `;

  const result = await db.query(query, [
    name,
    email,
    passwordHash,
    id,
  ]);

  return result.rows[0];
};

const updateUserStatus = async (id, isActive) => {
  const query = `
    UPDATE users
    SET
      is_active = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      is_active,
      last_login_at,
      created_at,
      updated_at
  `;

  const result = await db.query(query, [
    isActive,
    id,
  ]);

  return result.rows[0];
};

const assignRoles = async (userId, roleIds) => {
  for (const roleId of roleIds) {
    await db.query(
      `
        INSERT INTO user_roles (
          user_id,
          role_id
        )
        VALUES ($1, $2)
        ON CONFLICT (user_id, role_id)
        DO NOTHING
      `,
      [userId, roleId]
    );
  }
};

const assignSchools = async (userId, schoolIds) => {
  for (const schoolId of schoolIds) {
    await db.query(
      `
        INSERT INTO user_schools (
          user_id,
          school_id
        )
        VALUES ($1, $2)
        ON CONFLICT (user_id, school_id)
        DO NOTHING
      `,
      [userId, schoolId]
    );
  }
};

const removeRoles = async (userId) => {
  await db.query(
    `
      DELETE FROM user_roles
      WHERE user_id = $1
    `,
    [userId]
  );
};

const removeSchools = async (userId) => {
  await db.query(
    `
      DELETE FROM user_schools
      WHERE user_id = $1
    `,
    [userId]
  );
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  updateUserStatus,
  assignRoles,
  assignSchools,
  removeRoles,
  removeSchools,
};