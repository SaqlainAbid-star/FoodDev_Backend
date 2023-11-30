const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema(
  {
    image: String,
  },
  {
    collection: "Item_Images",
  }
);

module.exports = mongoose.model("Item_Images", imagesSchema);
