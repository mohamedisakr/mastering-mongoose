const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
// `schema` has 2 indexes: one on `name`, and one on `email`.
const schema = new Schema({
  name: { type: String, index: true },
  email: { type: String, index: true },
});
*/

const schema = new Schema({ name: String, email: String });
// Add 2 separate indexes to `schema`
schema.index({ name: 1 });
schema.index({ email: 1 });
