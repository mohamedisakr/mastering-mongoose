const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
let schema = Schema({
  email: {
    type: String,
    unique: true,
  },
});
const User = mongoose.model("User", schema);

const addUser = async () => {
  await User.init();
  // Unique index means MongoDB throws an 'E11000 duplicate key
  // error' if there are two documents with the same `email`.
  const err = await User.create([
    { email: "agent.smith@source.com" },
    { email: "agent.smith@source.com" },
  ]).catch((err) => err);

  console.log(err.message); // 'E11000 duplicate key error...'
};

connectToDB();
addUser();
*/

let schema = Schema({ firstName: String, lastName: String });
// A compound unique index on { firstName, lastName }
schema.index({ firstName: 1, lastName: 1 }, { unique: true });
const indexes = schema.indexes();
console.log(indexes.length); // 1
console.log(indexes[0][0]); // { firstName: 1, lastName: 1 }
console.log(indexes[0][1].unique); // true
