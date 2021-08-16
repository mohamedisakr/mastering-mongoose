const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const Group = mongoose.model(
  "Group",
  Schema({
    name: String,
    // `members` is an array of ObjectIds with `ref = 'Person'`
    members: [{ type: mongoose.ObjectId, ref: "Person" }],
  })
);

let Person = mongoose.model("Person", Schema({ name: String }));

const luke = await Person.create({ name: "Luke Skywalker" });
await Group.create({ name: "Jedi Order", members: [luke._id] });

const jedi = await Group.findOne().populate("members");
jedi.members[0] instanceof Person; // true
jedi.members[0].name; // 'Luke Skywalker'
*/

/*
const Group = mongoose.model(
  "Group",
  Schema({
    name: String,
    members: [
      {
        person: { type: mongoose.ObjectId, ref: "Person" },
        rank: String,
      },
    ],
  })
);

const luke = await Person.create({ name: "Luke Skywalker" });
const members = [{ person: luke._id, rank: "Jedi Knight" }];

await Group.create({ name: "Jedi Order", members });

// `populate()` can "drill down" into document arrays. It loops
// though each element in `members` and populates the `person` path.
const jedi = await Group.findOne().populate("members.person");
jedi.members[0].rank; // 'Jedi Knight'
jedi.members[0].person.name; // 'Luke Skywalker'
*/

/*
await Group.create({ _id: 66, name: "Jedi Order" });
await Person.create({ name: "Luke Skywalker", group: 66 });
const doc = await Person.findOne().populate({ path: "group" });
doc.group.name; // 'Jedi Order'
*/

/*
const groupSchema = Schema({ _id: Number, name: String });
const Group = mongoose.model("Group", groupSchema);

const Person = mongoose.model(
  "Person",
  Schema({
    name: String,
    // Note that 'ref' points to a model that isn't 'Group'
    group: { type: Number, ref: "OtherModel" },
  })
);

await Group.create({ _id: 66, name: "Jedi Order" });
await Person.create({ name: "Luke Skywalker", group: 66 });

// The `model` option overrides the model Mongoose populates
const doc = await Person.findOne().populate({
  path: "group",
  model: Group,
});
doc.group.name; // 'Jedi Order'
*/

/*
const Group = mongoose.model(
  "Group",
  Schema({
    name: String,
    members: [{ type: mongoose.ObjectId, ref: "Person" }],
  })
);

let personSchema = Schema({ name: String, isDeleted: Boolean });
const Person = mongoose.model("Person", personSchema);

const members = await Person.create([
  { name: "Luke Skywalker" },
  { name: "Anakin Skywalker", isDeleted: true },
]);

const name = "Jedi Order";
await Group.create({ name, members });

// Mongoose doesn't know to filter out documents with `isDeleted`
let doc = await Group.findOne({ name }).populate("members");
doc.members.length; // 2
doc.members[1].name; // 'Anakin Skywalker'

// You can use `match` to filter out docs with `isDeleted` set
const match = { isDeleted: { $ne: true } };
const path = "members";
doc = await Group.findOne({ name }).populate({ path, match });
doc.members.length; // 1
doc.members[0].name; // 'Luke Skywalker'
*/

/*
const people = await Person.create([
  { name: "Mace Windu" },
  { name: "Obi-Wan Kenobi" },
  { name: "Yoda" },
  { name: "Anakin Skywalker" },
]);

await Group.create({ name: "Jedi Order", members: people });

const path = "members";
const opts = { path, sort: { name: 1 }, skip: 1, limit: 2 };
const doc = await Group.findOne().populate(opts);

// ['Mace Windu', 'Obi-Wan Kenobi']
doc.members.map((doc) => doc.name);
*/

/*
const Group = mongoose.model(
  "Group",
  Schema({
    name: String,
    leader: { type: mongoose.ObjectId, ref: "Person" },
    people: [{ type: mongoose.ObjectId, ref: "Person" }],
  })
);

const mace = await Person.create({ name: "Mace Windu" });
const adi = await Person.create({ name: "Adi Gallia" });
const people = [mace, adi];

await Group.create({ name: "Jedi Order", leader: mace, people });

let doc = await Group.findOne().populate(["leader", "people"]);
doc.leader.name; // 'Mace Windu'
doc.people.map((doc) => doc.name); // ['Mace Windu', 'Adi Gallia']
*/

const Group = mongoose.model(
  "Group",
  Schema({
    name: String,
    leader: { type: mongoose.ObjectId, ref: "Person" },
    people: [{ type: mongoose.ObjectId, ref: "Person" }],
  })
);

const schema = Schema({ name: String, age: Number });
const Person = mongoose.model("Person", schema);

let mace = await Person.create({ name: "Mace Windu", age: 53 });
let yoda = await Person.create({ name: "Yoda", age: 90 });
let anakin = await Person.create({ name: "Anakin Skywalker" });
const people = [mace, yoda, anakin];

await Group.create({ name: "Jedi Order", leader: mace, people });

const match = { age: { $gte: 80 } };
const opts = ["leader", { path: "people", match }];
const doc = await Group.findOne().populate(opts);
doc.leader.name; // 'Mace Windu'
doc.people.map((doc) => doc.name); // ['Yoda']
