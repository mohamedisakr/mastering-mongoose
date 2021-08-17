const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

const User = mongoose.model("User", Schema({ name: String }));
await User.createCollection();
// MongoDB always creates an index on `_id`. Even though
// `listIndexes()` doesn't say that the `_id` index is unique,
// the `_id` index **is** a unique index.
const indexes = await User.listIndexes();
console.log(indexes.length); // 1
console.log(indexes[0].key); // { _id: 1 }
console.log(indexes[0].unique); // undefined

// Try to create 2 users with the exact same `_id`
const _id = new mongoose.Types.ObjectId();
const users = [{ _id }, { _id }];
const err = await User.create(users).catch((err) => err);
console.log(err.message); // 'E11000 duplicate key error...'
