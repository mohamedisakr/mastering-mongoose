const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String, age: Number });

// This is normal post middleware.
schema.post("save", () => console.log("this wont print"));

// If a post middleware function takes exactly 3 parameters, Mongoose
// will treat it as error handling middleware.
schema.post("save", function errorHandler(err, doc, next) {
  console.log("Error:", err.message);
  next(err);
});

const Model = mongoose.model("UserModel", schema);

try {
  // Prints "Error: UserModel validation failed..." because
  // of the `errorHandler()` function
  await Model.create({ age: "not a number" });
} catch (error) {
  error.message; // "UserModel validation failed..."
}
*/

/*
// Errors in pre hooks will trigger error handling middleware
schema.pre("save", () => {
  throw new Error("Oops!)");
});

// Wrapped function errors trigger error handling middleware
await Model.create({ age: "not a number" });

// Errors in post hooks also trigger error handling, but only if the
// error handler is defined after the hook that errors out.
schema.post("save", () => {
  throw new Error("Oops!");
});
*/

const Model = mongoose.model("UserModel", schema);

schema.post("save", function errorHandler(err, doc, next) {
  // By default, duplicate `_id` errors look like this:
  // "E11000 duplicate key error collection: test.usermodels"
  // Error handling middleware can make the error more readable
  if (err.code === 11000) return next(Error("Duplicate _id"));
  next(err);
});

const Model = mongoose.model("UserModel", schema);

const doc = await Model.create({ name: "test" });

await Model.create({ _id: doc._id }); // Throws "Duplicate _id"
