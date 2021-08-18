const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const userSchema = new Schema({
  name: String,
  email: String,
  // ... other properties
});
module.exports = userSchema;
*/

/*
module.exports = (db) => {
  const schemas = ["User" //...//];
  for (const schema of schemas) {
    db.model(schema, require(`${schema.toLowerCase()}Schema.js`));
  }
  return db;
};
*/

// connections/fast.js
const models = require("../models");
const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.MONGODB_URI);
module.exports = models(conn);

// connections/slow.js
const models = require("../models");
const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.MONGODB_URI);
module.exports = models(conn);
