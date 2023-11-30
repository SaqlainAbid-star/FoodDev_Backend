const express = require("express");

const { getAllUsers } = require("../controllers/userController");
const { verify } = require("../middleware/auth");
const router = express.Router();

router.get("/getUsers", getAllUsers);
router.post("/getUser",verify)


module.exports = router;
