require("dotenv").config();
const mysql = require("mysql2"); // mysql2 - because of async/await

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

let sql = "SELECT * FROM user_table";

// pool.execute(sql, function (err, res) {
//   if (err) throw err;

//   console.log(res);
//   res.forEach((res) => {
//     console.log(res.u_username);
//   });
// });

// connection.execute(
//   "SELECT * FROM `post_table` WHERE `name` = ?",
//   // req.body.u_username,
//   function (err, results, fields) {}
// );

// module.exports = connection.promise();
module.exports = connection;
