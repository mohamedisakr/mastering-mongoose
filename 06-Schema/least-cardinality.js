const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const personSchema = Schema({ name: String, rankId: ObjectId });
personSchema.virtual("rank", {
  ref: "Rank",
  localField: "rankId",
  foreignField: "_id",
  justOne: true,
});

const Person = mongoose.model("Person", personSchema);
const Rank = mongoose.model("Rank", Schema({ name: String }));

const rank1 = await Rank.create({ name: "Captain" });
const rank2 = await Rank.create({ name: "Lieutenant" });

await Person.create({ name: "James Kirk", rankId: rank1 });
await Person.create({ name: "Hikaru Sulu", rankId: rank2 });

let doc = await Person.findOne({ name: /Kirk/ }).populate("rank");
doc.rank.name; // 'Captain'
*/

/*
const personSchema = Schema({ name: String });
personSchema.virtual("rank", {
  ref: "Rank",
  localField: "_id",
  foreignField: "peopleIds",
  justOne: true,
});

const Person = mongoose.model("Person", personSchema);
const rankSchema = Schema({ name: String, peopleIds: [ObjectId] });
const Rank = mongoose.model("Rank", rankSchema);

let names = ["James T. Kirk", "Uhura", "Hikaru Sulu"];
let p = await Person.create(names.map((name) => ({ name })));
await Rank.create({ name: "Captain", peopleIds: [p[0]] });
await Rank.create({ name: "Lieutenant", peopleIds: [p[1], p[2]] });
let doc = await Person.findOne({ name: /Kirk/ }).populate("rank");
doc.rank.name; // 'Captain'
*/

/*
const docs = await Person.find().sort({ name: 1 }).populate("rank");
// Each `Person` has a `rank` document, and each `rank` document
// stores `peopleIds`. If you have thousands of captains, this data
// would be too bulky to send to a client.
docs[0].rank.peopleIds.length; // 1
docs[1].rank.peopleIds.length; // 2
docs[2].rank.peopleIds.length; // 2
*/

/*
const schema = Schema({ name: String, bId: ObjectId });
schema.virtual("b", {
  ref: "B",
  localField: "bId",
  foreignField: "_id",
  justOne: true,
});
const A = mongoose.model("A", schema);
const B = mongoose.model("B", Schema({ name: String }));
*/

/*
const schema = Schema({ name: String, showIds: [ObjectId] });
schema.virtual("shows", {
  ref: "Show",
  localField: "showIds",
  foreignField: "_id",
  justOne: false,
});
const Character = mongoose.model("Character", schema);

const Show = mongoose.model("Show", Schema({ name: String }));

const shows = await Show.create([
  { name: "Star Trek" },
  { name: "Star Trek: The Next Generation" },
]);

await Character.create([
  { name: "James T. Kirk", showIds: [shows[0]] },
  { name: "Leonard McCoy", showIds: [shows[0], shows[1]] },
]);

let v = await Character.findOne({ name: /McCoy/ }).populate("shows");
v.shows[0].name; // 'Star Trek'
v.shows[1].name; // 'Star Trek: The Next Generation'
*/

const userSchema = Schema({ name: String });
userSchema.virtual("attended", {
  ref: "Attendee",
  localField: "_id",
  foreignField: "user",
  justOne: false,
  // Recursively populate the `Attendee` model's 'event'
  options: { populate: "event" },
});

const User = mongoose.model("User", userSchema);
const Event = mongoose.model("Event", Schema({ name: String }));

// A mapping collection: 1 doc per mapping from `Person` to `Event`
const Attendee = mongoose.model(
  "Attendee",
  Schema({
    user: { type: ObjectId, ref: "User" },
    event: { type: ObjectId, ref: "Event" },
  })
);

const e1 = await Event.create({ name: "Khitomer Conference" });
const e2 = await Event.create({ name: "Enterprise-B Maiden Voyage" });

const users = await User.create([{ name: "Kirk" }, { name: "Spock" }]);

await Attendee.create({ event: e1, user: users[0] });
await Attendee.create({ event: e1, user: users[1] });
await Attendee.create({ event: e2, user: users[0] });

let doc = await User.findOne({ name: "Kirk" }).populate("attended");
doc.attended[0].event.name; // 'Khitomer Conference'
doc.attended[1].event.name; // 'Enterprise-B Maiden Voyage'
