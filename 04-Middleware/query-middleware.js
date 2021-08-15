const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String, age: Number });

// Attach pre('find') middleware
schema.pre("find", function () {
  console.log("Find", this.getQuery());
});

const Model = mongoose.model("Model", schema);

// Doesn't print anything
const query = Model.find({ age: { $lte: 30 } });

// Prints "Find { age: { $lte: 30 } }" from the `find()` middleware
await query;
*/

/*
const schema = Schema({ name: String, age: Number });

schema.pre("findOneAndUpdate", () => console.log("update"));

schema.post("findOne", () => console.log("findOne"));

const Model = mongoose.model("Model", schema);

// Doesn't trigger any middleware
const query = Model.findOneAndUpdate({}, { name: "test" });

// Prints "update"
await query.exec();
// Prints "findOne"
await Model.findOne({});
*/

/*
const schema = Schema({ name: String, age: Number });

schema.pre("find", () => console.log("find"));

schema.pre("updateOne", () => console.log("updateOne"));

const Model = mongoose.model("Model", schema);

const query = Model.find({ name: "Jean-Luc Picard" });

query.updateOne({}, { age: 70 });

query.op; // 'updateOne'

// Triggers `updateOne` middleware, **not** `find` middleware.
await query.exec();
*/

/*
const schema = Schema({ name: String, age: Number });

schema.pre("findOne", () => console.log("findOne"));

const Model = mongoose.model("Model", schema);

// Prints "findOne". There is no middleware for `findById()`.
await Model.findById(new mongoose.Types.ObjectId());
*/

/*
const schema = Schema({ name: String, age: Number });

schema.pre("updateOne", function () {
  console.log("updateOne", this.constructor.name);
});

const Model = mongoose.model("UserModel", schema);

const doc = await Model.create({ name: "Jean-Luc Picard", age: 59 });

// Prints "updateOne model" followed by "updateOne Query".
// `Document#updateOne()` triggers both document and query hooks
await doc.updateOne({ age: 60 });

// Prints "updateOne Query"
await Model.updateOne({ _id: doc._id }, { age: 61 });
*/

/*
const schema = Schema({ name: String, age: Number });

// The `options.document` parameter tells Mongoose to call
// 'updateOne' hooks as both document and query middleware
schema.pre("updateOne", { document: true }, function () {
  console.log("updateOne", this.constructor.name);
});

const Model = mongoose.model("UserModel", schema);

const doc = await Model.create({ name: "Jean-Luc Picard", age: 59 });

// Prints "updateOne model" followed by "updateOne Query"
await doc.updateOne({ age: 60 });
*/

/*
const schema = Schema({ name: String, age: Number });

// Only call this middleware function as document middleware for
// updateOne, not as query middleware.
schema.post("updateOne", { document: true, query: false }, function () {
  console.log("updateOne", this.constructor.name);
});

const Model = mongoose.model("UserModel", schema);

const doc = await Model.create({ name: "Jean-Luc Picard", age: 59 });

// Prints "updateOne model"
await doc.updateOne({ age: 60 });
*/

/*
const schema = Schema({ name: String, age: Number });

// By default, `schema.pre('remove')` only registers document
// middleware, **not** query middleware.
schema.pre("remove", function () {
  console.log("remove", this.constructor.name);
});

const Model = mongoose.model("UserModel", schema);

const doc = await Model.create({ name: "Jean-Luc Picard", age: 59 });

// Prints "remove model"
await doc.remove({ age: 60 });
*/
