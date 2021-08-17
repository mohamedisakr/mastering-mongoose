const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = new Schema({ name: String, email: String });
schema.index({ name: 1 });
schema.index({ email: 1 });
// Mongoose tries to build 2 indexes on the 'tests' collection. If
// the indexes already exist, Mongoose doesn't do anything.
const Model = mongoose.model("Test", schema);
*/

/*
const opts = { autoIndex: false }; // Disable auto index build
const schema = Schema({ name: { type: String, index: true } }, opts);
const Model = mongoose.model("Test", schema);
await Model.init();
// Does **not** have the index on `name`
const indexes = await Model.listIndexes();
*/

let schema = Schema({ name: { type: String, index: true } });
let Model = mongoose.model("Test", schema);
await Model.init();

// Now suppose you change the property `name` to `fullName`.
// By default, Mongoose won't drop the `name` index
schema = Schema({ fullName: { type: String, index: true } });
mongoose.deleteModel("Test");
Model = mongoose.model("Test", schema);
await Model.init();

// There are now 3 indexes in the database: one on `_id`, one
// on `name`, and one on `fullName`.
let indexes = await Model.listIndexes();
console.log(indexes.length); // 3

// Calling `Model.syncIndexes()` builds all indexes in your schema
// and drops all indexes that are not in your schema.
await Model.syncIndexes();
// 2 indexes, one on `_id` and one on `fullName`
indexes = await Model.listIndexes();
console.log(indexes.length); // 2
