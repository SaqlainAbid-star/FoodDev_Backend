const express = require("express");
const cors = require("cors");
const app = express();
const main = require("./models/connection");
const path = require("path");

// Allow access to uploaded files by serving them statically from the "uploads" directory.
app.use("/uploads", express.static("uploads"));       // http://localhost:8000/uploads/tikka.png
// app.use(express.static(path.join(process.cwd(), "public")));    

main();

// Cross-Origin Resource Sharing (CORS) is a security feature to prevent unauthorized requests from different origins.
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
app.use(cors({
  origin: "http://localhost:3001",
  origin: "*",
  credentials: true,
}));

// Parse incoming requests with JSON payloads and URL-encoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load environment variables from the .env file using the dotenv package.
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Server started at port 8000");
});

app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/addItem"));
app.use("/api", require("./routes/deleteItem"));
app.use("/api", require("./routes/editItem"));
app.use("/api", require("./routes/getUsers"));
app.use("/api", require("./routes/getFoodItems"));
app.use("/api", require("./routes/getItemDetail"));
app.use("/api", require("./routes/uploadImage"));
app.use("/api", require("./routes/OrderData"));

app.listen(8000, () => {
  console.log("Server started at port 8000");
});
