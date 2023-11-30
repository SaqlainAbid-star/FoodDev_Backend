const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    order_data: { type: Array, required: true },
    order_date: { type: Date, default: Date.now },
  },
  {
    collection: "Orders",
  }
);

module.exports = mongoose.model("Orders", ordersSchema);
