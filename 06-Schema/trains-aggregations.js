const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

const uri = ``;
const conn = await mongoose.createConnection(uri, { poolSize: 1 });
const Model = conn.model("Test", Schema({ name: String }));
await Model.create({ name: "test" });

// First, run a slow query that will take about 1 sec, but don't
// `await` on it, so you can execute a 2nd query in parallel.
const p = Model.find({ $where: "sleep(1000) || true" }).exec();
// Run a 2nd query that _should_ be fast, but isn't.
const startTime = Date.now();
await Model.findOne();
Date.now() - startTime; // Slightly more than 1000
