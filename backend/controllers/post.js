const connection = require("../config/database");

// ALL POSTS read/or not by user descending
exports.getAllPosts = async (req, res, next) => {
  const userId = req.auth.userId;

  try {
    const [posts] = await connection.query(
      `SELECT p.* , u.*,  r.r_user_id , 
      IF(p.p_author_id = ?  OR r.r_user_id = ?, TRUE  , FALSE )
      AS p_readby_user FROM post_table p
      LEFT JOIN (SELECT * FROM read_table WHERE r_user_id = ?) r ON p.p_id = r.r_post_id
      INNER JOIN user_table u ON u.u_id = p.p_author_id
      ORDER BY p.p_date_published DESC;`,
      [userId, userId, userId]
    );

    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// GET ONE POST
exports.getOnePost = async (req, res, next) => {
  const p_id = req.params.id;
  const userId = req.auth.userId;

  try {
    const [readTable] = await connection.query(
      `SELECT * FROM read_table 
      WHERE r_user_id = ? AND r_post_id = ?;`,
      [userId, p_id]
    );
    // check if user already read post - 0=negative
    if (readTable.length === 0) {
      // add user to read_table
      await connection.query(
        `INSERT INTO read_table  
        ( r_user_id, r_post_id) VALUES ( ?, ?);`,
        [userId, p_id]
      );
    }

    const [post] = await connection.query(
      `SELECT  p.*, u.*
      FROM post_table p
      INNER JOIN user_table u ON p.p_author_id = u.u_id
      WHERE p.p_id = ?`,
      [p_id]
    );

    // console.log("readTable:", readTable);
    // console.log("post:", post);
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
// CREATE POST
exports.createOnePost = async (req, res, next) => {
  const front_p_author_id = req.body.p_author_id;
  const front_p_text = req.body.p_text;
  const front_p_image_url = req.body.p_image_url;
  try {
    // const result =
    await connection.query(
      `
    INSERT INTO
    post_table (p_author_id, p_text, p_image_url)
    VALUES (?, ?, ?)
    `,
      [front_p_author_id, front_p_text, front_p_image_url]
    );
    res.status(201).send("Post created successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// ------------------------------
// optional /
// DELETE POST
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
