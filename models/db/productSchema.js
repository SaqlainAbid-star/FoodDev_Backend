const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemCategory: { type: String, required: true },
    itemImage: { type: String, required: true },
  },
  {
    collection: "Items",
  }
);

module.exports = mongoose.model("Items", itemsSchema);
