const express = require("express");
const { getAllItems } = require("../controllers/productController");
const router = express.Router();

router.get("/getFoodItems", getAllItems);

module.exports = router;
