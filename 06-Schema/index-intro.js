const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const docs = [];
for (let i = 0; i < 120000; ++i) {
  docs.push({ firstName: "Agent", lastName: "Smith" });
}

docs.push({ firstName: "John", lastName: "Smith" });

const userSchema = Schema({ firstName: String, lastName: String });
const User = mongoose.model("User", userSchema);

await User.insertMany(docs);

const start = Date.now();
const res = await User.find({ firstName: "John" });
const elapsed = Date.now() - start;
console.log(elapsed); // Approximately 104 on my laptop
*/

const docs = [];
for (let i = 0; i < 120000; ++i) {
  docs.push({ firstName: "Agent", lastName: "Smith" });
}

docs.push({ firstName: "John", lastName: "Smith" });

const userSchema = Schema({ firstName: String, lastName: String });
const User = mongoose.model("User", userSchema);

// Mongoose builds indexes automatically. However, if you
// need to wait for indexes to finish building, you should
// wait for `User.init()` to finish.
await User.init();
await User.insertMany(docs);

const start = Date.now();
const res = await User.find({ firstName: "John" });
const elapsed = Date.now() - start;
console.log(elapsed); // Approximately 14 on my laptop
