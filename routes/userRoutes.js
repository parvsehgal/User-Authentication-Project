const express = require("express");
const router = express.Router();

const { signUpHandler } = require("../controller/auth");

router.post("/signup", signUpHandler);

module.exports = router;
