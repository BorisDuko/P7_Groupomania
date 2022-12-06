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

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to db_p7_duko");
});

module.exports = connection;
