const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const Group = mongoose.model("Group", Schema({ name: String }));

const personSchema = Schema({
  name: String,
  groupId: mongoose.ObjectId,
});

personSchema.virtual("group", {
  ref: "Group",
  localField: "groupId",
  foreignField: "_id",
  justOne: true,
});

const Person = mongoose.model("Person", personSchema);

const groupId = await Group.create({ name: "Jedi Order" });

await Person.create({ name: "Luke Skywalker", groupId });

const person = await Person.findOne().populate("group");

person.group.name; // 'Jedi Order'
*/

/*
const groupSchema = Schema({ name: String });
groupSchema.virtual("people", {
  ref: "Person",
  localField: "_id",
  foreignField: "groupId",
  justOne: false,
});
const Group = mongoose.model("Group", groupSchema);

const schema = Schema({ name: String, groupId: "ObjectId" });
const Person = mongoose.model("Person", schema);

const groupId = await Group.create({ name: "Jedi Order" });
await Person.create({ name: "Luke Skywalker", groupId });
const jedi = await Group.findOne().populate("people");
jedi.people.map((doc) => doc.name); // ['Luke Skywalker']
*/

/*
const groupSchema = Schema({ name: String });
const ref = "Person";
const localField = "_id";
const foreignField = "groupId";
// If `justOne` is true, the populated virtual will be either
// a document, or `null` if no document was found.
const opts = { ref, localField, foreignField, justOne: true };
groupSchema.virtual("people", opts);

// If `justOne` is false, the populated virtual will be an
// array containing zero or more documents.
opts.justOne = false;
groupSchema.virtual("people", opts);
*/

/*
let groupSchema = Schema({
  name: String,
  // Behaves like `justOne: false`
  people: [{ type: mongoose.ObjectId, ref: "Person" }],
});

groupSchema = Schema({
  name: String,
  // Behaves like `justOne: true`
  people: { type: mongoose.ObjectId, ref: "Person" },
});
*/

/*
const groupSchema = Schema({ name: String });
groupSchema.virtual("person", {
  ref: "Person",
  localField: "_id",
  foreignField: "groupId",
  justOne: true,
});
const Group = mongoose.model("Group", groupSchema);

const Person = mongoose.model(
  "Person",
  Schema({ name: String, groupId: mongoose.ObjectId })
);

const groupId = await Group.create({ name: "Jedi Order" });

await Person.create({ name: "Luke Skywalker", groupId });
await Person.create({ name: "Obi-Wan Kenobi", groupId });

let jedi = await Group.findOne().populate({
  path: "person",
  options: { sort: { name: 1 } },
});
jedi.person.name; // 'Luke Skywalker'
*/

const countrySchema = Schema({ name: String });
countrySchema.virtual("numCities", {
  ref: "City",
  localField: "_id",
  foreignField: "countryId",
  count: true, // `numCities` will be a number, not an array
});
const Country = mongoose.model("Country", countrySchema);

let citySchema = Schema({ name: String, countryId: "ObjectId" });
const City = mongoose.model("City", citySchema);

let country = await Country.create({ name: "Switzerland" });
const docs = [{ name: "Bern" }, { name: "Zurich" }].map((doc) =>
  Object.assign(doc, { countryId: country._id })
);

await City.create(docs);
country = await Country.findOne().populate("numCities");
country.numCities; // 2
