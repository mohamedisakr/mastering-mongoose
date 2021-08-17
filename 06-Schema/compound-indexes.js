const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
let schema = Schema({ firstName: String, lastName: String });

// Define a compound index on { firstName, lastName }
schema.index({ firstName: 1, lastName: 1 });
const Model = mongoose.model("Test", schema);
await Model.init();

const indexes = await Model.listIndexes();
indexes.length; // 2
indexes[1].key; // { firstName: 1, lastName: 1 }
*/

/*
let schema = Schema({
  firstName: {
    type: String,
    index: { name: "firstNameLastName" },
  },
  lastName: {
    type: String,
    index: { name: "firstNameLastName" },
  },
});

const indexes = schema.indexes();
indexes.length; // 1
indexes[0][0]; // { firstName: 1, lastName: 1 }
*/

/*
let schema = Schema({ firstName: String, lastName: String });
// Querying by { firstName, lastName } will be slow, because
// there's only an index on `firstName` and every document
// has the same `firstName`.
schema.index({ firstName: 1 });
const User = mongoose.model("User", schema);

const docs = [];
for (let i = 0; i < 120000; ++i) {
  docs.push({ firstName: "Agent", lastName: "Smith" });
}
docs.push({ firstName: "Agent", lastName: "Brown" });

await User.insertMany(docs);

const start = Date.now();
let res = await User.find({ firstName: "Agent", lastName: "Brown" });
const elapsed = Date.now() - start;
// Approximately 315 on my laptop, 3x slower than if no index!
console.log(elapsed);
*/

let schema = Schema({ firstName: String, lastName: String });
schema.index({ firstName: 1, lastName: 1 });
const User = mongoose.model("User", schema);

const start = Date.now();
let res = await User.find({ firstName: "Agent", lastName: "Brown" });
const elapsed = Date.now() - start;
console.log(elapsed); // Approximately 10 on my laptop
