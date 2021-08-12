const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String, age: Number });
const Model = model("Model", schema);

const query = Model.find({ age: { $lte: 30 } });
let condition = query instanceof Query; // true
console.log(`query instanceof Query : ${condition}`);
*/

/*
const query = Model.findOne();

// Execute the query 3 times, in 3 different ways
await query; // 1
query.then((res) => {}); // 2
await query.exec(); // 3
*/

// Chaining makes it easier to visually break up complex updates
await Model.find({ name: "Will Riker" }).updateOne({}, { rank: "Commander" });
// Equivalent, without using chaining syntax
await Model.updateOne({ name: "Will Riker" }, { rank: "Commander" });
