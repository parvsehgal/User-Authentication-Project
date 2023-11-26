const User = require("../models/userModel");

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
    } catch (err) {
      res.status(500).json({ msg: "faild to hash password" });
    }

    const newUser = await User.create({ user, email, password, role });
  } catch (err) {
    res.status(500).json({ msg: "SignUp failed" });
  }
};
