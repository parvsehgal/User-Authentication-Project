const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(500).json({ msg: "token not provided" });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    console.log(payload);
    req.payload = payload;
  } catch (err) {
    res.status(500).json({ msg: "token not valid" });
  }
  next();
};

exports.isStudent = (req, res, next) => {
  try {
    const role = req.payload.role;
    if (role === "student") {
      next();
    } else {
      res.status(500).json({ msg: "you are not authorized for this portal" });
    }
  } catch (err) {
    res.status(500).json({ msg: "error authorizing" });
  }
};

exports.isAdmin = (req, res, next) => {
  const role = req.payload.role;
  if (role === "admin") {
    next();
  } else {
    res.status(500).json({ msg: "you are not authorized for this portal" });
  }
};
