const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    Category: { type: String, required: true, unique: true },
  },
  {
    collection: "Category",
  }
);

module.exports = mongoose.model("Category", categorySchema);
