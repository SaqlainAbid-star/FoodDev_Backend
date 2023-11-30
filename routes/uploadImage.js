const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/db/itemImages");
const Images = mongoose.model("Item_Images");

router.post("/uploadItemImage", (req, res) => {
  const { base64 } = req.body;
  try {
    Images.create({ image: base64 });
    res.send({ status: "image added", data: data });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

module.exports = router;
