const express = require("express");
const app = express();
const cors = require("cors");
const main = require("./models/connection");
const path = require("path");


app.use(express.json());

// Cross-Origin Resource Sharing (CORS) is a security feature to prevent unauthorized requests from different origins.
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins.

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
  ); // use cors middleware for all routes
  
// Parse incoming requests with JSON payloads and URL-encoded data.
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Allow access to uploaded files by serving them statically from the "uploads" directory.
app.use("/uploads", express.static("uploads"));       // http://localhost:8000/uploads/tikka.png
// app.use(express.static(path.join(process.cwd(), "public")));    

main();


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
