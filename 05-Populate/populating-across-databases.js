const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const host = "mongodb://localhost:27017";

const db1 = await mongoose.createConnection(`${host}/db1`);
const db2 = await mongoose.createConnection(`${host}/db2`);

const M1 = db1.model("Test", Schema({ name: String }));
// Note that `ref` below is a **Model**, not a string!
const M2 = db2.model(
  "Test",
  Schema({
    name: String,
    doc: { type: mongoose.ObjectId, ref: Model1 },
  })
);

const doc1 = await M1.create({ name: "model 1" });
await M2.create({ name: "model 2", doc: doc1._id });
const doc2 = await M2.findOne().populate("doc");
doc2.doc.name; // model 1
*/

/*
const schema = Schema({
  // If populated, `user` will either be a document or `null`
  user: { type: mongoose.ObjectId, ref: "User" },
  // If `populated`, `friends` will be an array of documents
  friends: [{ type: mongoose.ObjectId, ref: "User" }],
});
*/

const groupSchema = Schema({
  leaderId: mongoose.ObjectId,
  memberIds: [mongoose.ObjectId],
});

const ref = "Person";
const foreignField = "_id";
// If populated, `leader` will be a document, or `null` if no
// document was found, because `justOne` is true.
groupSchema.virtual("leader", {
  ref,
  localField: "leaderId",
  foreignField,
  justOne: true,
});

// If populated, `members` will be an array of zero or more
// documents, because `justOne` is false.
groupSchema.virtual("members", {
  ref,
  localField: "memberIds",
  foreignField,
  justOne: false,
});
