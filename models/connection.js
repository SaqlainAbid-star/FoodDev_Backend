const mongoose = require("mongoose");

// mongoDB project my-restaurant
// const URL = "mongodb+srv://Saqlain:Saqlain123@cluster0.jrwgn.mongodb.net/?retryWrites=true&w=majority"
// const URL = 'mongodb://127.0.0.1:27017/restaurant';
const URL = "mongodb+srv://Saqlain:Saqlain123@cluster0.oo31c.mongodb.net/?retryWrites=true&w=majority"


const main = async () => {
  await mongoose.connect(URL, { useNewUrlParser: true });
  console.log("MongoDB connected");

  // The mongoose.connection.db.collection() function is used to access the "Items" collection
  // find({}) function is called to fetch all documents in the collection. 
  // The data is then converted to an array using the toArray() method.
  // and store it in the global.food_items variable.

  const fetched_data = await mongoose.connection.db.collection("Items");
  fetched_data.find({}).toArray(function (err, data) {
    if (err) {
      console.log("error: ", err);
    } else {

      // global variables are accessible throughout the entire Node.js application, including all modules and files.

      global.food_items = data;
      console.log(global.food_items);
    }
  });
};

module.exports = main;
