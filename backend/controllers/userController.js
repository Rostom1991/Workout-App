const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//CREATE TOKEN
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All field required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json({ error: "User doesnt exists! " });
    }
    const matchPwd = await bcrypt.compare(password, userExists.password);
    if (!matchPwd) {
      return res.status(400).json({ error: "Wrong Password" });
    }
    const token = createToken(userExists._id);
    res.status(200).json({ msg: "Login Successfull", userExists, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All field required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email not valid" });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: hashPwd });
    const token = createToken(newUser._id);
    res
      .status(201)
      .json({ message: "User Created Successfully", newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup };
