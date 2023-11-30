const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/db/OrderSchema");
const OrderData = mongoose.model("Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  // await data.splice(0, 0, { order_date: req.body.order_date });

  // console.log(req.body.email);

  const eId = await OrderData.findOne({ email: req.body.email });
  if (eId === null) {
    try {
      await OrderData.create({
        email: req.body.email,
        order_data: data,
      }).then(() => {
        res.json({ status: "ok" });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    // if there is any existing order data for the given email in the database
    try {
      await OrderData.findOneAndUpdate(
        { email: req.body.email },
        // { $push: { order_data: data } }                // adding the data array
        { $push: { order_data: { $each: data } } }        // adding the objects from data array
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("server error:", error.message);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const myData = await OrderData.findOne({ email: req.body.email });
    return res.json({ status: "ok", orderData: myData });
  } catch (error) {
    console.log(error.message);
    res.send({ status: "server error" });
  }
});

router.get("/allOrdersData", async (req, res) => {
  try {
    const allorderData = await OrderData.find();
    return res.json({ status: "ok", allorderData });
  } catch (error) {
    console.log(error.message);
    res.send({ status: "server error" });
  }
});

module.exports = router;
