const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUpHandler = async (req, res) => {
  try {
    const { user, email, password, role } = req.body;
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(400).json({ msg: "user already exist" });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
    } catch (err) {
      res.status(500).json({ msg: "faild to hash password" });
    }
    const newUser = await User.create({ user, email, password, role });
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: "SignUp failed" });
  }
};

exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;

  let ourUser = await User.findOne({ email });

  if (!ourUser) {
    return res.status(500).json({ msg: "user does not exist" });
  }
  ourUser = ourUser.toObject();
  let isMatch = await bcrypt.compare(password, ourUser.password);
  if (isMatch) {
    const payload = {
      email: ourUser.email,
      id: ourUser._id,
    };

    const ourToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });
    const ops = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("ourCookie", ourToken, ops).status(200).json({
      ourUser,
      ourToken,
      msg: "logged in sucessfully",
    });
  } else {
    console.log(isMatch);
    res.status(500).json("incorrect password");
  }
};
