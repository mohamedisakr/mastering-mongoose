const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

const userSchema = Schema({ email: String });

const User = model("user", userSchema);

let query = User.findOne();
console.log(`op property is ${query.op}`); // 'findOne'

let instance = query instanceof mongoose.Query; // true
console.log(`query instanceof mongoose.Query : ${instance}`);

// Each model has its own subclass of the `mongoose.Query` class
instance = query instanceof User.Query; // true
console.log(`query instanceof User.Query : ${instance}`);

// const doc = await query; // Executes the query

// Equivalent to `await Model.findOne({ name: 'Jean-Luc Picard' })`
// const doc = await User.findOne().where('name').equals('Jean-Luc Picard')

// const query = User.findOne();

/*
// Equivalent to `Model.updateOne({ name: 'Jean-Luc Picard' },
// { $set: { age: 59 } })`
query = User.find({ name: "Jean-Luc Picard" }).updateOne(
  {},
  { $set: { age: 59 } }
);

// The `exec()` function executes the query and returns a promise.
const promise1 = User.findOne().exec();

// The `then()` function calls `exec()` and returns a promise
const promise2 = User.findOne().then((doc) => doc);

// Equivalently, `await` calls `then()` under the hood
const doc = await User.findOne();
*/
