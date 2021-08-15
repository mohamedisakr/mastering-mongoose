const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const Group = mongoose.model("Group", Schema({ name: String }));

const Person = mongoose.model(
  "Person",
  Schema({
    name: String,
    group: {
      type: mongoose.ObjectId,
      // `ref` means `group` references the 'Group' model
      ref: "Group",
    },
  })
);

const jedi = await Group.create({ name: "Jedi Order" });

await Person.create({ name: "Luke Skywalker", group: jedi._id });

const doc = await Person.findOne().populate("group");

doc.group.name; // 'Jedi Order'
*/

/*
const Group = mongoose.model(
  "Group",
  Schema({
    _id: Number,
    name: String,
  })
);

const Person = mongoose.model(
  "Person",
  Schema({
    name: String,
    group: { type: Number, ref: "Group" },
  })
);

await Group.create({ _id: 66, name: "Jedi Order" });
await Person.create({ name: "Luke Skywalker", group: 66 });

const doc = await Person.findOne().populate("group");
doc.group.name; // 'Jedi Order'
*/

/*
const Group = mongoose.model(
  "Group",
  Schema({
    _id: Number,
    name: String,
  })
);

const Person = mongoose.model(
  "Person",
  Schema({
    name: String,
    // `ref` can also be a Mongoose model as opposed to a string
    group: { type: Number, ref: Group },
  })
);

await Group.create({ _id: 66, name: "Jedi Order" });
await Person.create({ name: "Luke Skywalker", group: 66 });

const doc = await Person.findOne().populate("group");
doc.group.name; // 'Jedi Order'
*/

/*
const Person = mongoose.model(
  "Person",
  Schema({
    name: String,
    groupKind: String,
    // `ref` can also be a function that takes the document being
    // populated as a parameter. That means you can make `ref`
    // conditional based on the document's properties.
    group: { type: Number, ref: (doc) => doc.groupKind },
  })
);
*/

const Group = mongoose.model(
  "Group",
  Schema({
    _id: Number,
    name: String,
  })
);

const Person = mongoose.model(
  "Person",
  Schema({
    name: String,
    groupKind: String,
    group: { type: Number, ref: (doc) => doc.groupKind },
  })
);

const companySchema = Schema({ _id: Number, name: String });
const Company = mongoose.model("Company", companySchema);

await Group.create({ _id: 66, name: "Jedi Order" });
await Company.create({ _id: 5, name: "Cloud City Mining" });
await Person.create([
  { name: "Luke Skywalker", groupKind: "Group", group: 66 },
  { name: "Lando Calrissian", groupKind: "Company", group: 5 },
]);

const docs = await Person.find().sort({ name: 1 }).populate("group");
// The `group` property now contains multiple unrelated models.
docs[0].group instanceof Company; // true
docs[1].group instanceof Group; // true
docs[0].group.name; // 'Cloud City Mining'
docs[1].group.name; // 'Jedi Order'
