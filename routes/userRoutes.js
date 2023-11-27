const express = require("express");
const router = express.Router();

const { signUpHandler, loginHandler } = require("../controller/auth");

router.post("/signup", signUpHandler);
router.post("/login", loginHandler);

module.exports = router;
