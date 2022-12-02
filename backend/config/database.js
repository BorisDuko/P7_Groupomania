require("dotenv").config();
const mysql = require("mysql2"); // mysql2 - because of async/await

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to MySql db_p7_duko!");
});

module.exports = connection;
