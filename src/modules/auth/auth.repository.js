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

const createPasswordResetToken = async ({
  userId,
  tokenHash,
  expiresAt,
}) => {
  const query = `
    INSERT INTO password_reset_tokens (
      user_id,
      token_hash,
      expires_at
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const result = await db.query(query, [
    userId,
    tokenHash,
    expiresAt,
  ]);

  return result.rows[0];
};

const findValidPasswordResetToken = async (tokenHash) => {
  const query = `
    SELECT
      id,
      user_id,
      token_hash,
      expires_at,
      used_at
    FROM password_reset_tokens
    WHERE token_hash = $1
      AND used_at IS NULL
      AND expires_at > NOW()
    LIMIT 1
  `;

  const result = await db.query(query, [tokenHash]);

  return result.rows[0];
};

const markPasswordResetTokenUsed = async (id) => {
  const query = `
    UPDATE password_reset_tokens
    SET used_at = CURRENT_TIMESTAMP
    WHERE id = $1
  `;

  await db.query(query, [id]);
};

const updateUserPassword = async (userId, passwordHash) => {
  const query = `
    UPDATE users
    SET
      password_hash = $1,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING
      id,
      name,
      email,
      is_active,
      updated_at
  `;

  const result = await db.query(query, [
    passwordHash,
    userId,
  ]);

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
  findUserById,
  getUserRoles,
  createPasswordResetToken,
  findValidPasswordResetToken,
  markPasswordResetTokenUsed,
  updateUserPassword,
};