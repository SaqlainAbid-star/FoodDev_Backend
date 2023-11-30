const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true },
    userName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    // admin: { type: Boolean, required: true, default: false },
    UserType:{type:String},
  },

  //The configuration object passed as the second argument to mongoose.Schema() specifies additional options. 
  // In this case, the collection option is set to "Users,"
  // which explicitly specifies the name of the MongoDB collection where these documents will be stored.
  // If not provided, Mongoose will use the pluralized lowercase version of the model name to determine the collection name.

  {
    collection: "Users",
  }
);

mongoose.model("Users", userSchema);
