const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String, age: Number, rank: String });
const Character = mongoose.model('Character', schema);

await Character.create({ name: 'Will Riker', age: 29 });

const filter = { name: 'Will Riker' };
let update = { rank: 'Commander' };
const opts = { new: true };

let doc = await Character.findOneAndUpdate(filter, update, opts);
doc.rank; // 'Commander'

// By default, Mongoose wraps your update in `$set`, so the
// below update is equivalent to the previous update.
update = { $set: { rank: 'Captain' } };
doc = await Character.findOneAndUpdate(filter, update, opts);
doc.rank; // 'Captain'
*/

/*
const Character = mongoose.model(
  "Character",
  Schema({
    name: { first: String, last: String },
    age: Number,
    rank: String,
  })
);

const name = { first: "Will", last: "Riker" };
await Character.create({ name, age: 29, rank: "Commander" });

// Update `name.first` without touching `name.last`
const $set = { "name.first": "Thomas", rank: "Lieutenant" };

let doc = await Character.findOneAndUpdate({}, { $set }, { new: true });
doc.name.first; // 'Thomas'
doc.name.last; // 'Riker'
doc.rank; // 'Lieutenant'
*/

/*
const schema = Schema({ name: String, age: Number, rank: String });
const Character = mongoose.model("Character", schema);

await Character.create({ name: "Will Riker", age: 29 });
const filter = { name: "Will Riker" };

// Delete the `age` property
const update = { $unset: { age: 1 } };
const opts = { new: true };
let doc = await Character.findOneAndUpdate(filter, update, opts);
doc.age; // undefined
*/

/*
await Character.create({ name: "Will Riker", age: 29 });
let filter = { name: "Will Riker" };

// Set `rank` if inserting a new document
const update = { $setOnInsert: { rank: "Captain" } };

// If `upsert` option isn't set, `$setOnInsert` does nothing
const opts = { new: true, upsert: true };
let doc = await Character.findOneAndUpdate(filter, update, opts);
doc.rank; // undefined

filter = { name: "Jean-Luc Picard" };
doc = await Character.findOne(filter);
doc; // null, so upsert will insert a new document

doc = await Character.findOneAndUpdate(filter, update, opts);
doc.name; // 'Jean-Luc Picard'
doc.rank; // 'Captain'
*/

/*
await Character.create({ name: "Will Riker", age: 29 });
const filter = { name: "Will Riker" };
const update = { $min: { age: 30 } };
const opts = { new: true, upsert: true };

let doc = await Character.findOneAndUpdate(filter, update, opts);
doc.age; // 29
update.$min.age = 28;

doc = await Character.findOneAndUpdate(filter, update, opts);
doc.age; // 28
*/

/*
// Increment `age` by 1 using `$inc`
const filter = { name: "Will Riker" };
let update = { $inc: { age: 1 } };
const opts = { new: true };
let doc = await Character.findOneAndUpdate(filter, update, opts);
doc.age; // 30

// Decrement `age` by 1
update.$inc.age = -1;
doc = await Character.findOneAndUpdate(filter, update, opts);
doc.age; // 29

// Multiply `age` by 2
update = { $mul: { age: 2 } };
doc = await Character.findOneAndUpdate(filter, update, opts);
doc.age; // 58
*/

/*
const schema = Schema({ title: String, tags: [String] });
const Post = mongoose.model("BlogPost", schema);

const title = "Introduction to Mongoose";
await Post.create({ title, tags: ["Node.js"] });

// Add 'MongoDB' to the blog post's list of tags
const update = { $push: { tags: "MongoDB" } };
const opts = { new: true };
let doc = await Post.findOneAndUpdate({ title }, update, opts);

doc.tags; // ['Node.js', 'MongoDB']
*/

/*
const title = 'Introduction to Mongoose';
await Post.create({ title, tags: ['Node.js'] });

// 'MongoDB' isn't in `tags`, so `$addToSet` behaves like `$push`
const update = { $addToSet: { tags: 'MongoDB' } };
const opts = { new: true };
let doc = await Post.findOneAndUpdate({ title }, update, opts);
doc.tags; // ['Node.js', 'MongoDB']

// Since 'MongoDB' is in `tags`, `$addToSet` will be a no-op.
doc = await Post.findOneAndUpdate({ title }, update, opts);
doc.tags; // ['Node.js', 'MongoDB']
*/

// Make sure to add `_id: false`, otherwise Mongoose adds a unique
// unique `_id` to every subdoc, and then `$addToSet` will always
// add a new doc.
const commentSchema = Schema({ user: String, comment: String }, { _id: false });
const schema = Schema({ comments: [commentSchema] });
const Post = mongoose.model("BlogPost", schema);

const comment = { user: "jpicard", comment: "Make it so!" };
await Post.create({ comments: [comment] });

const update = { $addToSet: { comments: comment } };
const opts = { new: true };

// Skips adding, the new and old comments are deeply equal
let doc = await Post.findOneAndUpdate({}, update, opts);
doc.comments.length; // 1

// Adds a new comment, because the `comment` property is different
update.$addToSet.comments.comment = "Engage!";
doc = await Post.findOneAndUpdate({}, update, opts);
doc.comments.length; // 2

// Adds a new comment, the new comment has different keys
delete update.$addToSet.comments.comment;
doc = await Post.findOneAndUpdate({}, update, opts);
doc.comments.length; // 3
