require("dotenv").config();
const connection = require("../config/database");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// USER SIGNUP
exports.signup = (req, res, next) => {
  let front_u_username = req.body.u_username;
  let front_u_email = req.body.u_email;
  let front_u_pwd = req.body.u_pwd;

  let sql =
    "INSERT INTO user_table (u_username, u_email, u_pwd) VALUES (?,?,?)";
  connection.query(
    sql,
    [front_u_username, front_u_email, front_u_pwd],

    function (err, results) {
      // if (err) throw err;
      if (err) {
        console.log(err);
      }
      console.log("User added successfully!");
      res.status(201).json(results);
    }
  );
};
