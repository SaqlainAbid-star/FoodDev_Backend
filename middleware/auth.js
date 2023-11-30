const { SECRET_KEY } = require("../data/key");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const User = mongoose.model("Users");


exports.verify = (req, res, next) => {

  const token = req.body.token;

  // console.log(token);

  jwt.verify(token, SECRET_KEY, async (err, data) => {
    if (err) {
      return res.send({ status: false, message: "Authentication failed" });
    }
    const user = await User.findOne({ email: data.email })
    if (user) {
      return res.send({ status: true, user })
    }
    else return res.send({ status: false });
  });
};
