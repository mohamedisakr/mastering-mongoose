/*
const mongoose = require("mongoose");

module.exports = async function createConnection(uri, opts) {
  const db = mongoose.createConnection(uri, opts);
  db.model("User", require("./User.schema.js"));
  db.model("Photo", require("./Photo.schema.js"));
  return db;
};
*/

module.exports = async function createConnection(uri, opts) {
  // Will throw an error if initial connection fails.
  const db = await mongoose.createConnection(uri, opts);
  const User = db.model("User", require("./User.schema.js"));
  const Photo = db.model("Photo", require("./Photo.schema.js"));
  return { User, Photo };
};
