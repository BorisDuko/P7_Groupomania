require("dotenv").config();
const connection = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
// security improvements
// const validator = require("email-validator");
// const passwordValidator = require("password-validator");

// USER SIGNUP
exports.signup = async (req, res, next) => {
  let front_u_username = req.body.u_username;
  let front_u_email = req.body.u_email;
  try {
    const [isUsernameUnique] = await connection.query(
      `SELECT *
      FROM user_table
      WHERE u_username = ?
      `,
      front_u_username
    );
    const [isEmailUnique] = await connection.query(
      `SELECT *
        FROM user_table
        WHERE u_email = ?`,
      front_u_email
    );
    // check if user name is available
    if (isUsernameUnique.length > 0) {
      console.log("This username already taken");
      res.status(400).send("This username already taken");
      return;
      // check if email is available
    } else if (isEmailUnique.length > 0) {
      console.log("This email already taken");
      res.status(400).send("This email already taken");
      return;
    } else {
      // create new user
      let front_hashed_u_pwd = await bcrypt.hash(req.body.u_pwd, 10);
      await connection.query(
        `INSERT INTO
           user_table (u_username, u_email, u_pwd)
           VALUES (?,?,?)`,
        [front_u_username, front_u_email, front_hashed_u_pwd]
      );
      console.log(`${front_u_username} added successfully`);
      res.status(201).send(`${front_u_username} added successfully`);
    }
  } catch (error) {
    res.status(400).send(`something went wrong: ${error}`);
  }
};

// USER LOGIN
exports.login = async (req, res, next) => {
  let front_u_username = req.body.u_username;
  let front_u_pwd = req.body.u_pwd;
  try {
    const [isUsernameExist] = await connection.query(
      `SELECT *
       FROM user_table
       WHERE u_username = ?`,
      [front_u_username]
    );
    // check if user exist
    if (isUsernameExist.length === 0) {
      console.log("User doesn't exists");
      res.status(404).send(`${front_u_username} doesn't exist`);
      return;
    } else {
      let hashedPassword = isUsernameExist[0].u_pwd;
      let userId = isUsernameExist[0].u_id;
      if (await bcrypt.compare(front_u_pwd, hashedPassword)) {
        const token = jwt.sign({ userId }, SECRET_KEY, {
          expiresIn: "23h",
        });
        console.log("userId:", userId);
        console.log(`${front_u_username} logged in successfully`);
        // res.status(200).send(`${front_u_username} is logged in!`);
        res.status(200).json({
          userId: isUsernameExist[0].u_id,
          token: token,
        });
      } else {
        console.log("Password Incorrect");
        res.send("Password incorrect");
      }
    }
  } catch (error) {
    res.status(500).send(`something went wrong-> ${error}`);
  }
};

// DELETE USER
exports.deleteUser = async (req, res, next) => {
  let u_id = req.params.id;
  try {
    await connection.query(`DELETE FROM user_table WHERE u_id=?`, u_id);
    console.log("User DELETED");
    res.status(200).send("User Deleted");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// find out user's ID
async function getUserId(username) {
  let [userId] = await connection.query(
    `SELECT u_id 
     FROM user_table 
     WHERE u_username=?`,
    username
  );
  console.log("User's ID:", userId[0].u_id);
  return userId[0].u_id;
}

// getUserId("new_user2"); // 35
