const connection = require("../config/database");

// ALL POSTS
exports.getAllPosts = async (req, res, next) => {
  connection.query(
    "SELECT * FROM post_table",

    function (err, results) {
      if (err) throw err;
      // console.log(results);
      res.status(200).json(results);
    }
  );
};
// GET ONE POST
exports.getOnePost = async (req, res, next) => {
  let post_id = req.params.id;
  let sql = "SELECT * FROM post_table WHERE p_id=?";
  connection.query(
    sql,
    post_id,

    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.status(200).json(results);
    }
  );
};
// CREATE POST
exports.createOnePost = async (req, res, next) => {
  let front_p_author_id = req.body.p_author_id;
  let front_p_text = req.body.p_text;
  let front_p_image_url = req.body.p_image_url;

  let sql =
    "INSERT INTO post_table(p_author_id, p_text, p_image_url) VALUES(?, ?, ?)";
  connection.query(
    sql,
    [front_p_author_id, front_p_text, front_p_image_url],

    function (err, results) {
      // if (err) throw err; //crushing the app
      if (err) {
        //console.log(err);
      }
      console.log(req);
      //console.log(results);
      res.status(201).json(results);
      // res.send("Posted");
    }
  );
};

// DELETE POST
exports.deletePost = async (req, res, next) => {
  let post_id = req.params.id;
  let sql = "DELETE FROM post_table WHERE p_id=?";
  connection.query(
    sql,
    post_id,

    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Post DELETED");
      res.status(200).json(results);
    }
  );
};

// not sure if needed
// UPDATE POST
exports.updatePost = async (req, res, next) => {
  let post_id = req.params.id;
  let front_p_author_id = req.body.p_author_id;
  let front_p_text = req.body.p_text;
  let front_p_image_url = req.body.p_image_url;
  let sql =
    "UPDATE post_table SET p_author_id=?,p_text=?,p_image_url=? WHERE p_id=?";
  connection.query(
    sql,
    [front_p_author_id, front_p_text, front_p_image_url, post_id],

    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.log("Post Updated");
      res.status(200).json(results);
    }
  );
};
