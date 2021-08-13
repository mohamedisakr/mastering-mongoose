const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
await Model.create([
  { name: "Jean-Luc Picard", age: 59 },
  { name: "Will Riker", age: 29 },
  { name: "Deanna Troi", age: 29 },
]);

const filter = { age: { $lt: 30 } };

let res = await Model.find(filter);
res[0].name; // 'Will Riker'
res[1].name; // 'Deanna Troi'

res = await Model.findOne(filter);
res.name; // 'Will Riker'
res = await Model.countDocuments(filter);
res; // 2
*/

/*
await Model.insertMany([
  { name: "Jean-Luc Picard", age: 59 },
  { name: "Will Riker", age: 29 },
  { name: "Deanna Troi", age: 29 },
]);

const filter = { age: { $lt: 30 } };

let res = await Model.deleteOne(filter);
res.deletedCount; // 1

await Model.create({ name: "Will Riker", age: 29 });
res = await Model.deleteMany(filter);
res.deletedCount; // 2

await Model.insertMany([
  { name: "Will Riker", age: 29 },
  { name: "Deanna Troi", age: 29 },
]);
// `remove()` deletes all docs that match `filter` by default
res = await Model.remove(filter);
res.deletedCount; // 2
*/

/*
const schema = Schema({ name: String, age: Number, rank: String });
const Model = mongoose.model("Model", schema);

await Model.insertMany([
  { name: "Jean-Luc Picard", age: 59 },
  { name: "Will Riker", age: 29 },
  { name: "Deanna Troi", age: 29 },
]);

const filter = { age: { $lt: 30 } };
const update = { rank: "Commander" };

// `updateOne()`
let res = await Model.updateOne(filter, update);
res.nModified; // 1

let docs = await Model.find(filter);
docs[0].rank; // 'Commander'
docs[1].rank; // undefined

// `updateMany()`
res = await Model.updateMany(filter, update);
res.nModified; // 2

docs = await Model.find(filter);
docs[0].rank; // 'Commander'
docs[1].rank; // 'Commander'

// `update()` behaves like `updateOne()` by default
res = await Model.update(filter, update);
res.nModified; // 1
*/

/*
const filter = { age: { $lt: 30 } };
const replacement = { name: "Will Riker", rank: "Commander" };

// Sets `rank`, unsets `age`
let res = await Model.replaceOne(filter, replacement);
res.nModified; // 1

let docs = await Model.find({ name: "Will Riker" });
!!docs[0]._id; // true
docs[0].name; // 'Will Riker'
docs[0].rank; // 'Commander'
docs[0].age; // undefined
*/

/*
const filter = { name: "Will Riker" };
const update = { rank: "Commander" };

// MongoDB will return the matched doc as it was **before**
// applying `update`
let doc = await Model.findOneAndUpdate(filter, update);
doc.name; // 'Will Riker'
doc.rank; // undefined

const replacement = { name: "Will Riker", rank: "Commander" };
doc = await Model.findOneAndReplace(filter, replacement);

// `doc` still has an `age` key, because `findOneAndReplace()`
// returns the document as it was before it was replaced.
doc.rank; // 'Commander'
doc.age; // 29

// Delete the doc and return the doc as it was before the
// MongoDB server deleted it.
doc = await Model.findOneAndDelete(filter);
doc.name; // 'Will Riker'
doc.rank; // 'Commander'
doc.age; // undefined
*/

/*
const filter = { name: "Will Riker" };
const update = { rank: "Commander" };
const options = { new: true };

// MongoDB will return the matched doc **after** the update
// was applied if you set the `new` option
let doc = await Model.findOneAndUpdate(filter, update, options);
doc.name; // 'Will Riker'
doc.rank; // 'Commander'

const replacement = { name: "Will Riker", rank: "Commander" };
doc = await Model.findOneAndReplace(filter, replacement, options);
doc.rank; // 'Commander'
doc.age; // void 0
*/

/*
// Return an array containing the distinct values of the `age`
// property. The values in the array can be in any order.
let values = await Model.distinct("age");
values.sort(); // [29, 59]
const filter = { age: { $lte: 29 } };
values = await Model.distinct("name", filter);
values.sort(); // ['Deanna Troi', 'Will Riker']
*/

// Unlike `countDocuments()`, `estimatedDocumentCount()` does **not**
// take a `filter` parameter. It only returns the number of documents
// in the collection.
const count = await Model.estimatedDocumentCount();
count; // 3
