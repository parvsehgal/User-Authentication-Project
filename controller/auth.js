const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
