const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/mydb";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const connectToDB = async () => {
  console.log("Connecting to database");
  await mongoose.connect(uri, options);
};

module.exports = { connectToDB };