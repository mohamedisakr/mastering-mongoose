const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

let userSchema = Schema({
  firstName: String,
  lastName: String,
  test: String,
});

userSchema.index({ firstName: 1, lastName: 1 });
const User = mongoose.model("User", userSchema);

const firstName = "Agent";
const lastName = "Smith";

const add120kUser = async () => {
  // Insert 120k + 1 documents. 2 documents are different.
  const docs = [];
  for (let i = 0; i < 120000 - 1; ++i) {
    docs.push({ firstName, lastName });
  }

  docs.push({ firstName, lastName, test: "test" });
  docs.push({ firstName, lastName: "Brown" });
  await User.insertMany(docs);
};

const findOneUserWithIndex = async () => {
  let res = await User.find({ firstName, lastName: "Brown" }).explain();
  // { stage: 'IXSCAN', nReturned: 1, ... }
  console.log(res[0].executionStats.executionStages.inputStage);
};

const findOneUserWithOutIndex = async () => {
  // Only one result, but has to scan 120000 documents to get it!
  const filter = { firstName, lastName, test: "test" };
  res = await User.find(filter).explain();

  // { stage: 'IXSCAN', nReturned: 120000, ... }
  console.log(res[0].executionStats.executionStages.inputStage);
};

connectToDB();
add120kUser();
findOneUserWithIndex();
findOneUserWithOutIndex();
