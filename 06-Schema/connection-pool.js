const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const uri = ``;
const conn1 = await mongoose.createConnection(uri, { poolSize: 1 });
const conn2 = await mongoose.createConnection(uri, { poolSize: 1 });

const Model1 = conn1.model("Test", Schema({ name: String }));
const Model2 = conn2.model("Test", Schema({ name: String }));
await Model1.create({ name: "test" });

// Because this operation is on a separate connection, it won't
// slow down operations on `Model2`
const p = Model1.find({ $where: "sleep(1000) || true" }).exec();
const startTime = Date.now();
const doc = await Model2.findOne();
doc.name; // 'test'
const elapsed = Date.now() - startTime; // Much less than 1000
console.log(elapsed);
*/

/*
const parentSchema = Schema({ _id: Number });
const Parent = mongoose.model("Parent", parentSchema);

const childSchema = Schema({ name: String, parentId: Number });
const Child = mongoose.model("Child", childSchema);

const parents = [];
for (let i = 0; i < 10000; ++i) {
  parents.push({ _id: i });
}
await Parent.insertMany(parents);

const cs = [];
for (let i = 0; i < 10000; ++i) {
  cs.push({ name: i, parentId: i });
}
await Child.insertMany(cs);

const startTime = Date.now();
await Parent.aggregate([
  {
    $lookup: {
      from: "Bar",
      localField: "_id",
      foreignField: "fooId",
      as: "bars",
    },
  },
]);
// Takes about 200ms on my laptop even though there's only 10k
// documents. Performance degrades as O(N^2) because of $lookup.
const elapsed = Date.now() - startTime;
console.log(elapsed);
*/

const parentSchema = Schema({ _id: Number });
const Parent = mongoose.model("Parent", parentSchema);

const childSchema = Schema({ name: String, parentId: Number });
const Child = mongoose.model("Child", childSchema);

const parents = [];
for (let i = 0; i < 10000; ++i) {
  parents.push({ _id: i });
}
await Parent.insertMany(parents);

const cs = [];
for (let i = 0; i < 10000; ++i) {
  cs.push({ name: i, parentId: i });
}
await Child.insertMany(cs);

const startTime = Date.now();
const err = await Parent.aggregate([
  {
    $lookup: {
      from: "Bar",
      localField: "_id",
      foreignField: "fooId",
      as: "bars",
    },
  },
])
  .option({ maxTimeMS: 10 })
  .catch((err) => err);
err.message; // 'operation exceeded time limit'
const elapsed = Date.now() - startTime; // About 10
console.log(elapsed);
