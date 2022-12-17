require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  })
  .promise();

async function connectionToDatabase() {
  try {
    await connection.connect;
    console.log("Successfully connected to db_p7_duko");
  } catch (error) {
    throw error;
  }
}
connectionToDatabase();

module.exports = connection;

// callback connection (old way)
// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to db_p7_duko");
// });
