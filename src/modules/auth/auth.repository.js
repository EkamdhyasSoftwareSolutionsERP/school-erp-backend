const db = require("../../config/dataBase");


const findUserByEmail = async (email) => {
  const result = await db.query(
    `
    SELECT 
      id,
      name,
      email,
      password_hash,
      is_active
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

const findRefreshToken = async (token) => {
  const query = `
    SELECT *
    FROM refresh_tokens
    WHERE token = $1
      AND expires_at > NOW()
  `;

  const result = await db.query(query, [token]);

  return result.rows[0];
};

const saveRefreshToken = async ({
  userId,
  token,
  expiresAt
}) => {
  const query = `
    INSERT INTO refresh_tokens (
      user_id,
      token,
      expires_at
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await db.query(query, [
    userId,
    token,
    expiresAt
  ]);

  return result.rows[0];
};

const deleteRefreshToken = async (token) => {
  const query = `
    DELETE FROM refresh_tokens
    WHERE token = $1
    RETURNING id
  `;

  const result = await db.query(query, [token]);

  return result.rows[0];
};

const findUserById = async (userId) => {
  const query = `
    SELECT
      id,
      email,
      name,
      is_active,
      created_at
    FROM users
    WHERE id = $1
    LIMIT 1
  `;

  const result = await db.query(query, [userId]);

  return result.rows[0];
};

const getUserRoles = async (userId) => {
  const query = `
    SELECT r.name
    FROM roles r
    INNER JOIN user_roles ur
      ON ur.role_id = r.id
    WHERE ur.user_id = $1
  `;

  const result = await db.query(query, [userId]);

  return result.rows.map((role) => role.name);
};

module.exports = {
  findUserByEmail,
  findRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
  findUserById,
  getUserRoles,
};