const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("../models/db/productSchema");
const Item = mongoose.model("Items");


// add item
module.exports.addItem = async (req, res) => {
  const { itemName, itemDescription, itemCategory, itemPrice } = req.body;
  const { filename } = req.file;
  console.log("req.body: ", req.body);
  console.log("ItemImage: " + filename);

  try {
    const oldItem = await Item.findOne({ itemName });
    if (oldItem) {
      return res.json({ error: "Item Exists" });
    }
    await Item.create({
      itemName,
      itemDescription,
      itemCategory,
      itemPrice,
      itemImage: filename,
    });

    res.send({ status: "item added" });
  } catch (error) {
    console.log("Error", error);
    res.send({ status: "item could not be added" });
  }
};

// delete item
module.exports.deleteItem = async (req, res) => {
  const { _id } = req.params;
  // console.log(_id);
  try {
    const deletedItem = await Item.findByIdAndDelete(_id);
    if (!deletedItem) {
      res.send({ status: "item not found", data: "error" });
    } else {
      res.send({ status: "ok! item deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};


// editItem
module.exports.editItem = async (req, res) => {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send({ status: "ok product updated", data: item });
}


// Get All Items
module.exports.getAllItems = async (req, res) => {
  try {
    const food_items = await Item.find({});
    // const food_images = await ItemImages.find({});
    // const categories = await CategoryItems.find({});
    res.send({ status: "ok", data: food_items });
  } catch (error) {
    res.send("Server error items could not fetched");
  }
};
