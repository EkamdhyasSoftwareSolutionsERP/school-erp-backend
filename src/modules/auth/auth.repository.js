const pool = require("../../config/database");

const findUserByEmail = async (email) => {
  const result = await pool.query(
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

module.exports = {
  findUserByEmail,
};