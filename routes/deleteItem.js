const express = require("express");
const router = express.Router();
const { deleteItem } = require("../controllers/productController");

router.delete(`/deleteItem/:_id`, deleteItem);

module.exports = router;
