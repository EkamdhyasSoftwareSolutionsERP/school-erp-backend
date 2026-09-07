const pool = require("./dataBase");

const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();

    console.log("PostgreSQL connected successfully");

    client.release();
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

testDatabaseConnection();