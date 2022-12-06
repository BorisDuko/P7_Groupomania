const connection = require("../config/database");

// ALL POSTS
exports.getAllPosts = (req, res, next) => {
  connection.query("SELECT * FROM post_table", (err, results) => {
    if (err) throw err;
    // console.log(results);
    res.status(200).json(results);
  });
};
//--------------------------------------
// -- -- Get all posts with a mark for those read by a specific user --
`SELECT p.p_id, p.p_text, p.p_date_published, 
IF(r.r_user_id = 2, r.r_post_id  , NULL )
AS post_read_by_user FROM post_table p 
LEFT JOIN read_table r ON p.p_id = r.r_post_id
ORDER BY p.p_date_published DESC`;
//--------------------------------------
// GET ONE POST
exports.getOnePost = (req, res, next) => {
  let post_id = req.params.id;
  let sql = "SELECT * FROM post_table WHERE p_id=?";
  connection.query(
    sql,
    post_id,

    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.status(200).json(results);
    }
  );
};
// CREATE POST
exports.createOnePost = (req, res, next) => {
  let front_p_author_id = req.body.p_author_id;
  let front_p_text = req.body.p_text;
  let front_p_image_url = req.body.p_image_url;

  connection.query(
    `INSERT INTO 
    post_table (p_author_id, p_text, p_image_url) 
    VALUES (?, ?, ?)`,
    [front_p_author_id, front_p_text, front_p_image_url],
    (err, results) => {
      // if (err) throw err;
      if (err) {
        console.log(err);
      }
      console.log("Post created successfully!");
      res.status(201).json(results);
    }
  );
};

// ------------------------------
// optional /
// DELETE POST - must also clear the read_table and the images in the file system
exports.deletePost = (req, res, next) => {
  let post_id = req.params.id;

  connection.query(
    "DELETE FROM post_table WHERE p_id=?",
    post_id,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("Post DELETED");
      res.status(200).send("Post DELETED");
    }
  );
};
// UPDATE POST
exports.updatePost = (req, res, next) => {
  let post_id = req.params.id;
  let front_p_author_id = req.body.p_author_id;
  let front_p_text = req.body.p_text;
  let front_p_image_url = req.body.p_image_url;
  let sql =
    "UPDATE post_table SET p_author_id=?,p_text=?,p_image_url=? WHERE p_id=?";
  connection.query(
    sql,
    [front_p_author_id, front_p_text, front_p_image_url, post_id],

    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("Post Updated");
      res.status(200).send("Post Updated");
    }
  );
};
