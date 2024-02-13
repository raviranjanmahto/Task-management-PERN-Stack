const { Pool } = require("pg");

// Database connection configuration
// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DATABASE,
// });

const conString = process.env.DATABASE_URL; // Read the connection string from environment variable
const pool = new Pool({
  connectionString: conString,
});

// Use pool.query() to execute queries
pool.query('SELECT NOW() AS "theTime"', (err, result) => {
  if (err) {
    return console.error("error running query", err);
  }
  console.log("Connected to database", result.rows[0].theTime);
  // >> output: 2024-02-13T15:43:49.402Z
});

module.exports = pool;
