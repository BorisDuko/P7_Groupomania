require("dotenv").config();
const connection = require("../config/database");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// USER SIGNUP
exports.signup = async (req, res, next) => {
  let front_u_username = req.body.u_username;
  let front_u_email = req.body.u_email;
  // check if user name is available
  connection.query(
    `SELECT * 
    FROM user_table 
    WHERE u_username = ?`,
    [front_u_username],
    async (err, result) => {
      console.log("Result for username query", result); // return array
      if (result.length > 0) {
        console.log("This username already taken");
        res.status(400).send("This username already taken");
        return;
      } else {
        // create new user
        let front_hashed_u_pwd = await bcrypt.hash(req.body.u_pwd, 10);
        connection.query(
          `INSERT INTO 
          user_table (u_username, u_email, u_pwd) 
          VALUES (?,?,?)`,
          [front_u_username, front_u_email, front_hashed_u_pwd],
          (err, results) => {
            // if (err) throw err;
            if (err) {
              console.log(err);
            }
            console.log("User added successfully!");
            res.status(201).json(results);
          }
        ); // end insert new user query
      } // end else (create user)
    } // end async function from user check
  ); // end name query check
}; // end exports.signup

// USER LOGIN (ignoring front_u_email for now)
exports.login = (req, res, next) => {
  let front_u_username = req.body.u_username;
  // let front_u_email = req.body.u_email;
  let front_u_pwd = req.body.u_pwd;

  // check if user exist
  connection.query(
    "SELECT * FROM user_table WHERE u_username = ?",
    front_u_username,
    async (err, result) => {
      if (result.length == 0) {
        console.log("User doesn't exists");
        res.status(404).send(`${front_u_username} doesn't exist`);
        return;
      } else {
        // if user - continue
        let hashedPassword = result[0].u_pwd;
        if (await bcrypt.compare(front_u_pwd, hashedPassword)) {
          console.log(`${front_u_username} logged in successfully`);
          res.status(200).send(`${front_u_username} is logged in!`);
        } else {
          console.log("Password Incorrect");
          res.send("Password incorrect");
        }
      }
    }
  );
};

// DELETE USER
exports.deleteUser = (req, res, next) => {
  let u_id = req.params.id;
  let sql = "DELETE FROM user_table WHERE u_id=?";
  connection.query(sql, u_id, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log("User DELETED");
    res.status(200).send("User Deleted");
  });
};

// DUPLICATE CHECK FUNCTION
function isInputUnique(columnName, columnValue) {
  let sql = "SELECT * from user_table WHERE  " + columnName + " = ?";
  connection.query(sql, columnValue, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("IS UNIQUE RESULT:", result);
    return false;
    // if (result.length > 0) {
    //   console.log("The result:", result);
    //   console.log("if: ", columnName);
    //   console.log("if: ", columnValue);
    //   return false;
    // } else {
    //   console.log("result:", result);
    //   console.log("else: ", columnName);
    //   console.log("else: ", columnValue);
    //   return true;
    // }
  });
} // end function isInputUnique

// -----------------------------------------
// old user sign up
// else if {
//   connection.query(
//     `SELECT *
//     FROM user_table
//     WHERE u_email = ?`,
//     front_u_email,
//     async function (err, result) {
//       console.log("Result for email query", result); // return array
//       if (result.length > 0) {
//         console.log("This email already taken");
//         res.status(400).send("This email already taken" );
//         return;
//       }
//   )
// }
