const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String, age: Number });

const Model = mongoose.model("Character", schema);

await Model.create({ name: "Jean-Luc Picard", age: 59 });
await Model.create({ name: "Will Riker", age: 29 });
await Model.create({ name: "Deanna Troi", age: 29 });

// The below is equivalent to `Model.find({ age: { $gte: 30 } })`
const docs = await Model.aggregate([
  {
    // To add a `$match` stage, you add an object to the array
    // with a `$match` property. The value of the `$match` property
    // is a filter. The aggregation framework only lets documents
    // that match the filter pass the `$match` stage.
    $match: { age: { $gte: 30 } },
  },
]);

console.log(docs.length); // 1
console.log(docs[0].name); // 'Jean-Luc Picard'
*/

/*
// Note that there's no `await` here.
const aggregate = Model.aggregate([{ $match: { age: { $gte: 30 } } }]);

// Mongoose's `Aggregate` class is a tool for building
// aggregation pipelines using function call chaining.
aggregate instanceof mongoose.Aggregate; // true
*/

/*
const schema = Schema({ name: String, age: Number });

schema.pre("aggregate", function () {
  this instanceof mongoose.Aggregate; // true
  const pipeline = this.pipeline();
  pipeline[0]; // { $match: { age: { $gte: 30 } } }
});

schema.post("aggregate", function (res) {
  this instanceof mongoose.Aggregate; // true
  res.length; // 1
  res[0].name; // 'Jean-Luc Picard'
});

const Model = mongoose.model("Character", schema);

// Triggers `pre('aggregate')` and `post('aggregate')`
await Model.aggregate([{ $match: { age: { $gte: 30 } } }]);
*/

/*
const schema = Schema({ name: String, age: Number });

schema.pre("aggregate", function () {
  console.log("Called");
});

const Model = mongoose.model("Character", schema);

// Does **not** trigger aggregation middleware
const agg = Model.aggregate([{ $match: { age: { $gte: 30 } } }]);

// Mongoose only runs aggregation middleware when you `exec()`
await agg.exec();
*/

/*
const s = Schema({ name: String, age: Number, isDeleted: Boolean });

s.pre("aggregate", function () {
  // Prepend a `$match` stage to every aggregation pipeline that
  // filters out documents whose `isDeleted` property is true
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });
});
*/

await User.create({ name: "Jean-Luc Picard", age: 59 });
await User.create({ name: "Will Riker", age: 29 });
await User.create({ name: "Tasha Yar", isDeleted: true });

// Will **not** return the Tasha Yar doc, because
// that user is soft deleted.
const $match = { age: { $lte: 30 } };
const docs = await User.aggregate([{ $match }]);
docs.length; // 1
docs[0].name; // Will Riker
