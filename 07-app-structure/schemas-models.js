const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // ... other properties
});
module.exports = mongoose.model("User", userSchema);
*/

/*
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // ... other properties
});

mongoose.model("User", userSchema);

// Equivalent:
mongoose.connection.model("User", userSchema);
*/

// `user.js` queries should be on the "fast connection"
const fastConn = require("../connections/fast.js");
const { Schema } = require("mongoose");
const schema = Schema({ name: String, email: String /*...*/ });
module.exports = fastConn.model("User", schema);

// On the other hand, `pageView.js` queries are for slow
// analytics queries, and should be on the "slow connection"
// to avoid slowing down fast queries.
const slowConn = require("../connections/slow.js");
const { Schema } = require("mongoose");
const schema = Schema({ url: String, time: Date /*...*/ });
module.exports = slowConn.model("PageView", schema);
