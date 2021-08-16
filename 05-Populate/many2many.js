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
    members: [{ type: mongoose.ObjectId, ref: "Person" }],
  })
);

const Person = mongoose.model("Person", Schema({ name: String }));

const luke = await Person.create({ name: "Luke Skywalker" });
const han = await Person.create({ name: "Han Solo" });

// Each `Group` has multiple members, and the Luke Skywalker
// document is part of multiple groups.
await Group.create({ name: "Jedi Order", members: [luke] });

const name = "Rebel Alliance";
await Group.create({ name, members: [luke, han] });

const group = await Group.findOne({ name }).populate("members");
group.members[0].name; // 'Luke Skywalker'
group.members[1].name; // 'Han Solo'
*/

/*
const Group = mongoose.model(
  "Group",
  Schema({
    name: String,
    members: [{ type: mongoose.ObjectId, ref: "Person" }],
  })
);

const personSchema = Schema({ name: String });
personSchema.virtual("groups", {
  ref: "Group",
  localField: "_id",
  // `populate()` is smart enough to drill into `foreignField` if
  // `foreignField` is an array
  foreignField: "members",
});

const Person = mongoose.model("Person", personSchema);
const doc = await Person.findOne({ name: "Luke Skywalker" }).populate({
  path: "groups",
  options: { sort: { name: 1 } },
});

doc.groups[0].name; // 'Jedi Order'
doc.groups[1].name; // 'Rebel Alliance'
*/

/*
const userSchema = Schema({
  // Won't work well if a user has millions of followers - might
  // run into the 16 MB document size limit.
  followers: [
    {
      type: mongoose.ObjectId,
      ref: "User",
    },
  ],
});
*/

// `Follow` represents `follower` following `followee`.
// No risk of `Follow` documents growing to 16MB.
const Follow = mongoose.model(
  "Follow",
  Schema({
    follower: { type: ObjectId, ref: "User" },
    followee: { type: ObjectId, ref: "User" },
  })
);

const userSchema = Schema({ name: String });
userSchema.virtual("followers", {
  ref: "Follow",
  localField: "_id",
  foreignField: "followee",
});
const User = mongoose.model("User", userSchema);

const user1 = await User.create({ name: "Mark Hamill" });
const user2 = await User.create({ name: "John Smith" });
const user3 = await User.create({ name: "Mike Jackson" });

await Follow.create({ follower: user2, followee: user1 });
await Follow.create({ follower: user3, followee: user1 });

// Find all of Mark Hamill's followers by populating
// `followers` and then `followers.follower`
const populate = { path: "follower" };
const opts = { path: "followers", populate };
let doc = await User.findOne({ name: /Hamill/ }).populate(opts);
doc.followers[0].follower.name; // 'John Smith'
doc.followers[1].follower.name; // 'Mike Jackson'
