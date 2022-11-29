require("dotenv").config();
const mysql = require("mysql2"); // mysql2 - because of async/await

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

let sql = "SELECT * FROM user_table";

// pool.execute(sql, function (err, res) {
//   if (err) throw err;

//     console.log(res);
//   res.forEach((res) => {
//     console.log(res.u_username);
//   });
// });

module.exports = pool.promise();
