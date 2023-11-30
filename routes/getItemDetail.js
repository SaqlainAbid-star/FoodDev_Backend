const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/db/productSchema");
const Product = mongoose.model("Items");


router.get(`/getItemDetail/:_id`, async (req, res) => {
  // console.log("req:", req.params._id);
  let product = await Product.findOne({ _id: req.params._id });
  if (product) {
    res.send({ status: "ok", data: product });
  } else {
    res.send({ status: "item not found" });
  }
});

module.exports = router;
 
