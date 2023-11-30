const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/key");
require("../models/db/userSchema");
const User = mongoose.model("Users");

module.exports.createUser = async (req, res) => {
  // Extract user data from the request body
  const { userType, userName, email, phoneNumber, address, password } = req.body;

  // Encrypt the password using bcrypt with a work factor of 12
  const encryptedPassword = await bcrypt.hash(password, 12);

  try {
    // Check if the user with the given email already exists in the database
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      // Create the user using the User model
      const user = await User.create({
        userType,
        userName,
        address,
        phoneNumber,
        email,
        password: encryptedPassword,
      });
      res.status(201).send({ success: true, message: "User Successfully Created" });
    } else {
      res.send({ success: false, message: "User Already exists" });
    }
  } catch (error) {
    res.send({ success: false, error: error });
  }
};


module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Does Not Exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    if (res.status(201)) {
      return res.status(201).send({ success: true, user, token});
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ success: false, error: "InvAlid Password" });
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({ status: "ok", data: allUsers });
  } catch (error) {
    console.log(error.message);
    res.send("Server error");
  }
};

