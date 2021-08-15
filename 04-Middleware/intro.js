const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

const schema = Schema({ name: String });

// `middleware` is a function that Mongoose will call for you
// when you call `save()`
schema.pre("save", function middleware() {
  console.log("Saving", this.name);
});

const Model = mongoose.model("Test", schema);
const doc = new Model({ name: "test" });

// Prints "Saving test"
await doc.save();
