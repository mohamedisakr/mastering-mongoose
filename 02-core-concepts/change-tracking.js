const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MyModel = model(
  "MyModel",
  Schema({
    name: String,
    age: Number,
  })
);

const doc = new MyModel({});
doc.name = "Jean Valjean";
doc.age = 27;
await doc.save(); // Persist `doc` to MongoDB

// Mongoose loads the document from MongoDB and then _hydrates_ it
// into a full Mongoose document.
const doc = await MyModel.findOne();
doc.name; // "Jean Valjean"
doc.name = "Monsieur Leblanc";
doc.modifiedPaths(); // ['name']
// `save()` only sends updated paths to MongoDB. Mongoose doesn't
// send `age`.
await doc.save();
