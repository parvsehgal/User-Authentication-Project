const express = require("express");
const router = express.Router();

const { signUpHandler, loginHandler } = require("../controller/auth");
const { auth, isStudent, isAdmin } = require("../middlewares/autherization");
router.post("/signup", signUpHandler);
router.post("/login", loginHandler);

//protected routes
router.get("/student", auth, isStudent, (req, res) => {
  res.status(200).json({ msg: "sucessfully reached student portal" });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.status(200).json({ msg: "sucessfully reached admin portal" });
});

module.exports = router;
