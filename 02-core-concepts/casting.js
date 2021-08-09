const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const schema = Schema({ name: String, age: Number });
// const MyModel = model("MyModel", schema);
// const doc = new MyModel({});
// doc.age = "not a number";
// // Throws CastError: Cast to Number failed for value
// // "not a number" at path "age"
// doc.save();

const schema = Schema({ name: String, age: Number });
const Person = mongoose.model("Person", schema);
const doc = new Person({ name: "Jean-Luc Picard", age: 59 });

doc.age = null;
doc.name = undefined;
// Succeeds, because Mongoose casting lets `null` and `undefined`.
// `name` and `age` will _both_ be `null` in the database.
await doc.save();
