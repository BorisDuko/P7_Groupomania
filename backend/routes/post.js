const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
// const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, postCtrl.createOnePost);
router.get("/:id", auth, postCtrl.getOnePost);

// router.delete("/:id", postCtrl.deletePost);
// router.put("/:id", postCtrl.updatePost);
module.exports = router;
