const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String });

schema.pre("validate", () => console.log("pre validate"));

const Model = mongoose.model("Test", schema);

const doc = new Model({ name: "test" });

// Prints "pre validate"
await doc.save();
*/

const schema = Schema({ name: String });

schema.pre("validate", () => console.log("pre validate"));

schema.post("validate", () => console.log("post validate"));

schema.pre("save", () => console.log("pre save"));

schema.post("save", () => console.log("post save"));

const Model = mongoose.model("Test", schema);

const doc = new Model({ name: "test" });

// Prints
// "pre validate",
// "post validate",
// "pre save",
// "post save"
await doc.save();
