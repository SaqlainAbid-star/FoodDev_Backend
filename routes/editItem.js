const express = require("express");
const router = express.Router();
const { editItem } = require("../controllers/productController");

router.put(`/editItem/:id`, editItem);

module.exports = router;
