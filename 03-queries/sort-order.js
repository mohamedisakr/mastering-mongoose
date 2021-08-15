const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = new Schema({ name: String, age: Number });
const Character = mongoose.model("Character", schema);

await Character.create({ name: "Jean-Luc Picard", age: 59 });
await Character.create({ name: "Will Riker", age: 29 });

// `doc` may be either of the 2 documents inserted above.
// Natural order means MongoDB may return whichever one.
const doc = await Character.findOne();
*/

/*
// The 3rd parameter to `findOne()` is an `options` parameter.
// `options.sort` lets you specify what order MongoDB should
// use when checking which documents match `filter`
const options = { sort: { name: 1 } };

// `doc` will always be the doc with name 'Jean-Luc Picard'
let doc = await Character.findOne({}, null, options);

// You can also set the `sort` option using `Query#sort()`.
doc = await Character.findOne({}).sort({ name: 1 });
*/

/*
// Update the character with the highest `age`. The `sort` option
// can be a string property name, or an object.
await Character.updateOne({}, { rank: "Captain" }).sort("-age");

// Find all characters, sorted by `age`
const docs = await Character.find().sort({ age: 1 });

// Delete the character whose name comes first alphabetically
// out of all the characters whose age is greater than 25.
await Character.deleteOne({ age: { $gt: 25 } }).sort("name");
*/

/*
const schema = new Schema({ value: String });
const TestString = mongoose.model("TestString", schema);

await TestString.create([
  { value: "A" },
  { value: "a" },
  { value: "Z" },
  { value: "z" },
  { value: "" },
  { value: "aa" },
]);

let docs = await TestString.find().sort({ value: 1 });
docs.map((v) => v.value); // ['', 'A', 'Z', 'a', 'aa', 'z']
*/

/*
// `value: {}` means Mongoose skips casting the `value` property
const schema = new Schema({ value: {} });
const Test = mongoose.model("Test", schema);

await Test.create([
  { value: 42 },
  { value: "test string" },
  { value: true },
  { value: null },
]);

const docs = await Test.find().sort({ value: 1 });
docs.map((v) => v.value); // [null, 42, 'test string', true]
*/

/*
// `value: {}` means Mongoose skips casting the `value` property,
// so `value` can be of any type.
const schema = new Schema({ value: {} });
const Test = mongoose.model("Test", schema);

await Test.create([{ value: 42 }]);
const opts = { new: true };
// Does nothing because 'a' > 42 in MongoDB's sort order
let doc = await Test.findOneAndUpdate({}, { $min: { value: "a" } }, opts);
doc.value; // 42

// Sets `value` to `null` because `null` is smaller than
// any other value in MongoDB's sort order.
doc = await Test.findOneAndUpdate({}, { $min: { value: null } }, opts);
doc.value; // null
*/

const schema = new Schema({ value: {} });
const Test = mongoose.model("Test", schema);

await Test.create([{ value: 42 }]);

// Does **not** find the doc. 42 is greater than null in MongoDB
// sort order, but `$gte` only compares values with the same type
let doc = await Test.findOne({ value: { $gte: null } });

// Also doesn't find the doc. `$lte` will only compare docs
// whose `value` is the same type as the given value (string).
doc = await Test.findOne({ value: { $lte: "42" } });
