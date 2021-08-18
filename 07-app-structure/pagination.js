const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const commitSchema = Schema({
  repo: String,
  message: String,
  hash: String,
  diff: String,
  order: Number,
});

const Commit = mongoose.model("Commit", commitSchema);
*/

/*
function getPage(repo, pageNum, perPage) {
  return Commit.find({ repo })
    .sort({ order: -1 })
    .skip(pageNum * perPage)
    .limit(perPage);
}

const commitSchema = Schema({
  repo: String,
  message: String,
  hash: String,
  diff: String,
  order: Number,
});

const Commit = mongoose.model("Commit", commitSchema);

const repo = "mongoosejs/test";
for (let i = 1; i <= 100; ++i) {
  await Commit.create({ repo, message: `# ${i}`, order: i });
}

const page1 = await getPage("mongoosejs/test", 0, 5);
page1.map((doc) => doc.order); // [100, 99, 98, 97, 96]
const page2 = await getPage("mongoosejs/test", 1, 5);
page2.map((doc) => doc.order); // [95, 94, 93, 92, 91]
*/

const firstPage = (repo, perPage) =>
  Commit.find({ repo }).sort({ order: -1 }).limit(perPage);

const nextPage = (repo, perPage, $lt) =>
  Commit.find({ repo, order: { $lt } }).sort({ order: -1 }).limit(perPage);

const prevPage = (repo, perPage, $gt) =>
  Commit.find({ repo, order: { $gt } }).sort({ order: -1 }).limit(perPage);

const page1 = await firstPage("mongoosejs/test", 5);
page1.map((doc) => doc.order); // [100, 99, 98, 97, 96]
const page2 = await nextPage(
  "mongoosejs/test",
  5,
  page1[page1.length - 1].order
);
page2.map((doc) => doc.order); // [95, 94, 93, 92, 91]
