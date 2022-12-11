const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

// router.post("/signup", userCtrl.signup);
// router.post("/login", userCtrl.login);

// testing
// router.route("/:id").get(userCtrl.getPostById);
// router.get(userCtrl.getAllPosts).post(userCtrl.createNewPost);
router.get("/", postCtrl.getAllPosts);
router.post("/", postCtrl.createOnePost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", postCtrl.deletePost);

router.put("/:id", postCtrl.updatePost);
module.exports = router;
