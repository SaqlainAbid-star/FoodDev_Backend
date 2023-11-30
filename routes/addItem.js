const express = require("express");
// used for handling file uploads.
const multer = require("multer");
const cors = require("cors");
const router = express.Router();
const path = require("path");
const { addItem } = require("../controllers/productController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));
// router.use(express.static(__dirname + "./public/"));
router.use(express.static(path.join(__dirname, "public")));


// This block of code defines the storage configuration for the multer middleware.
const storage = multer.diskStorage({
  // The destination function determines the destination folder for storing uploaded files. 
  // In this case, it's set to "uploads".
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  // The filename function determines the filename of the uploaded file. 
  // It uses the current timestamp (Date.now()) along with the original filename to avoid naming conflicts.
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});


// This block of code defines the fileFilter function used by the multer middleware
// fileFilter is a function that checks if the uploaded file's MIME type is allowed.
const fileFilter = (req, file, cb) => {
  
  // In this case, it only allows "image/jpeg", "image/jpg", and "image/png" file types.
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    // If the file type is allowed, it calls cb(null, true) to accept the file;
    cb(null, true);
  } else {
    // otherwise, it calls cb(null, false) to reject the file.
    cb(null, false);
  }
};

// This line creates a multer middleware instance using the storage and fileFilter configurations defined earlier.
const upload = multer({ storage, fileFilter });


// The route uses upload.single("itemImage") middleware to handle a single image upload.
// image file to be sent with the field name "itemImage". 
// The uploaded file will be available in req.file.

router.post("/addItem", upload.single("itemImage"), addItem );

module.exports = router;
