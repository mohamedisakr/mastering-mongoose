/*
const { Schema } = require("mongoose");
module.exports = Schema({
  name: String,
  email: String,
});
*/

/*
const mongoose = require("mongoose");
mongoose.model("User", require("./User.schema.js"));
mongoose.model("Photo", require("./Photo.schema.js"));
let opts = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(process.env.MONGODB_URI, opts);
module.exports = mongoose.connection;
*/

const db = require("path/to/models");
// Get the `User` model and use it
const User = db.model("User");
User.findOne().then((user) => console.log(user));
