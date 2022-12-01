const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
// router.post("/login", userCtrl.login);

router.get("/signup", (req, res) => {
  res.send({ data: "Here is your GET USER signup data" });
});
router.get("/login", (req, res) => {
  res.send({ data: "Here is your GET USER login data" });
});
router.post("/", (req, res) => {
  res.send({ data: "POST: User created" });
});
router.put("/", (req, res) => {
  res.send({ data: "PUT: User updated" });
});
router.delete("/", (req, res) => {
  res.send({ data: "DELETE: User deleted" });
});

module.exports = router;
