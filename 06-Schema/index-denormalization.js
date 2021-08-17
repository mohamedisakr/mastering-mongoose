const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const User = mongoose.model(
  "User",
  Schema({
    name: String,
    group: { type: mongoose.ObjectId, ref: "Group" },
  })
);
const Group = mongoose.model("Group", Schema({ name: String }));

// Finds all users, and then populates the user's `group` if the
// group's name is 'Jedi'. Even if you have an index on `Group.name`,
// this query will run a collection scan on `User`.
User.find().populate({ path: "group", match: { name: "Jedi" } });
*/

const User = mongoose.model(
  "User",
  Schema({
    name: String,
    groupName: { type: String, index: true },
    group: { type: mongoose.ObjectId, ref: "Group" },
  })
);
const Group = mongoose.model("Group", Schema({ name: String }));
