const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
require("../01-getting-started/1.2-connecting-to-mongodb");

let schema = Schema({ firstName: String, lastName: String });
// Build an index on `lastName` in reverse order
schema.index({ lastName: -1 });
const User = mongoose.model("User", schema);

const add200kUsers = async () => {
  await User.deleteMany({});

  const docs = [];
  for (let i = 0; i < 200000; ++i) {
    docs.push({ firstName: "Agent", lastName: "Smith" });
    docs.push({ firstName: "Agent", lastName: "Brown" });
    docs.push({ firstName: "Agent", lastName: "Thompson" });
  }

  await User.insertMany(docs);
};

const sortByFirstName = async () => {
  let start = Date.now();
  await User.find().sort({ firstName: 1 });
  let elapsed = Date.now() - start;
  console.log(`Sort by first name takes : ${elapsed}`); // Approximately 751
};

const sortByLastName = async () => {
  start = Date.now();
  await User.find().sort({ lastName: -1 });
  elapsed = Date.now() - start;
  console.log(`Sort by last name takes : ${elapsed}`); // Approximately 641, about 15% faster
};

add200kUsers();
sortByFirstName();
sortByLastName();
