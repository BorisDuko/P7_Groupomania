const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

// router.post("/signup", userCtrl.signup);
// router.post("/login", userCtrl.login);

// testing
// router.route("/:id").get(userCtrl.getPostById);
// router.get(userCtrl.getAllPosts).post(userCtrl.createNewPost);
router.get("/", postCtrl.getAllPosts);

router.get("/:id", postCtrl.getOnePost);

router.post("/", postCtrl.createOnePost);

router.put("/", (req, res) => {
  res.send({ data: "PUT: Post updated" });
});
router.delete("/:id", postCtrl.deletePost);

module.exports = router;
