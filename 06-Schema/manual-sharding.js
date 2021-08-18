const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

// 2 different MongoDB servers
const host1 = "mongodb://mongodb1:27017";
const host2 = "mongodb://mongodb2:27017";

const db1 = await mongoose.createConnection(`${host1}/db`);
const db2 = await mongoose.createConnection(`${host2}/db`);

const M1 = db1.model("Test", Schema({ name: String }));
// Note that `ref` below is a **Model**, not a string!
const M2 = db2.model(
  "Test",
  Schema({
    name: String,
    doc: { type: mongoose.ObjectId, ref: Model1 },
  })
);

const name = "model 2";
const doc1 = await M1.create({ name: "model 1" });
await Model2.create({ name, doc: doc1._id });
const doc2 = await M2.findOne({ name }).populate("doc");
doc2.doc.name; // model 1
