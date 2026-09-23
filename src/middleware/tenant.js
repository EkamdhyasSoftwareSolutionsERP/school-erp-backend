const db = require("../config/dataBase");
const ApiError = require("../common/ApiError");

const tenant = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
    

    const roleResult = await db.query(
    `
    SELECT r.name
    FROM user_roles ur
    INNER JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = $1
    `,
    [req.user.id]
    );

const isSuperAdmin = roleResult.rows.some(
  (row) => row.name === "SUPER_ADMIN"
);

    let schoolIds = [];

    if (isSuperAdmin) {
      const result = await db.query(`
        SELECT id
        FROM schools
        WHERE is_active = true
      `);

      schoolIds = result.rows.map((row) => row.id);
    } else {
      const result = await db.query(
        `
        SELECT school_id
        FROM user_schools
        WHERE user_id = $1
        `,
        [req.user.id]
      );

      schoolIds = result.rows.map((row) => row.school_id);
    }

    

    req.schoolContext = {
      schoolIds,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = tenant;