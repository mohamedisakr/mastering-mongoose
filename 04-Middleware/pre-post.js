const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String });

// Mongoose will execute `preFn()` before saving the document...
schema.pre("save", function preFn() {
  console.log("Saving", this.name);
});

// And `postFn()` after saving the document
schema.post("save", function postFn() {
  console.log("Saved", this.name);
});

const Model = mongoose.model("Test", schema);
const doc = new Model({ name: "test" });

// Prints
// "Saving test"
// "Saved test"
await doc.save();
*/

/*
const schema = Schema({ name: String });

schema.pre("save", () => console.log("pre save 1"));
schema.pre("save", () => console.log("pre save 2"));

const Model = mongoose.model("Test", schema);
const doc = new Model({ name: "test" });

// Prints "pre save 1" followed by "pre save 2"
await doc.save();
*/

schema.post("save", function (doc) {
  console.log("Saved:", doc.name);
});

const Model = mongoose.model("Test", schema);

const doc = new Model({ name: "test" });
// Prints "Saved: test"
await doc.save();
