const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String });

schema.pre("save", async function () {
  console.log("Waiting");
  await new Promise((resolve) => setTimeout(resolve, 50));
  console.log("First Done");
});

schema.pre("save", () => console.log("Second"));

const Model = mongoose.model("Test", schema);

const doc = new Model({ name: "test" });
// Prints
// "Waiting",
// "First Done",
// "Second"
await doc.save();
*/

const schema = Schema({ name: String });

schema.pre("save", function (next) {
  console.log("1");
  setTimeout(() => {
    console.log("2");
    next();
  }, 50);
});

schema.pre("save", () => console.log("3"));

// For post hooks, `next()` is the 2nd parameter
schema.post("save", function (doc, next) {
  console.log("4");
  setTimeout(() => {
    console.log("5");
    next();
  }, 50);
});

schema.post("save", () => console.log("6"));

const Model = mongoose.model("Test", schema);
const doc = new Model({ name: "test" });
// Prints "1", "2", "3", "4", "5", "6"
await doc.save();
