const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = new Schema({ name: String, age: Number });
const Character = mongoose.model("Character", schema);

await Character.create({ name: "Jean-Luc Picard", age: 59 });
await Character.create({ name: "Will Riker", age: 29 });
await Character.create({ name: "Deanna Troi", age: 29 });

// Sort by `age` ascending, and return at most 2 documents.
const docs = await Character.find().sort({ age: 1 }).limit(2);
*/

/*
await Character.create({ name: "Jean-Luc Picard", age: 59 });
await Character.create({ name: "Beverly Crusher", age: 40 });
await Character.create({ name: "Will Riker", age: 29 });
await Character.create({ name: "Deanna Troi", age: 29 });

const docs = await Character.find()
  .sort({ age: 1 }) // Sort by `age` ascending
  .skip(2) // Skip the 2 documents
  .limit(2); // And return at most 2 documents
docs.map((doc) => doc.name); // ['Bevery Crusher', 'Jean-Luc Picard']
*/

/*
const resultSchema = Schema({ title: String, order: Number });
const SearchResult = mongoose.model("SearchResult", resultSchema);

for (let i = 1; i <= 25; ++i) {
  await SearchResult.create({ order: i, title: "test" + i });
}

function getResults(page, resultsPerPage) {
  return SearchResult.find()
    .sort({ order: 1 })
    .skip(page * resultsPerPage)
    .limit(resultsPerPage);
}

// Returns results 11-20
const docs = await getResults(1, 10);
*/

/*
let schema = Schema({ name: String, age: Number, rank: String });
const Character = mongoose.model("Character", schema);

await Character.create([{ name: "Will Riker", age: 29, rank: "Commander" }]);

// Include `name` and `age`, exclude `rank`
let projection = { name: 1, age: 1 };
let doc = await Character.findOne().select(projection);
doc.name; // 'Will Riker'
doc.rank; // undefined

// Exclude `name` and `age`, include `rank`
projection = { name: false, age: false };
doc = await Character.findOne().select(projection);
doc.name; // undefined
doc.rank; // 'Commander'
*/

/*
const projection = { name: 1, age: 0 };
const err = await Character.findOne()
  .select(projection)
  .catch((err) => err);
// 'Projection cannot have a mix of inclusion and exclusion.'
err.message;
*/

/*
const update = { age: 44, rank: "Captain" };
const opts = { new: true };
const projection = { name: 1, age: 1 };

// Updates `rank`, but excludes it from the result document
const doc = await Character.findOneAndUpdate({}, update, opts).select(
  projection
);
doc.age; // 44
doc.rank; // undefined
*/

/*
const update = { age: 44, rank: "Captain" };
const fields = { nModified: 0 };
const res = await Character.updateOne({}, update).select(fields);
res.nModified; // 1
*/

/*
const User = mongoose.model(
  "User",
  Schema({
    name: String,
    // Exclude `email` by default
    email: { type: String, select: false },
  })
);

await User.create({ name: "John", email: "john@gmail.com" });
await User.create({ name: "Bill", email: "bill@startup.co" });

const docs = await User.find().sort({ name: 1 });

docs[0].name; // 'Bill'
docs[1].name; // 'John'
docs[0].email; // undefined
docs[1].email; // undefined
*/

/*
const docs = await User.find().sort({ name: 1 }).select("email");
docs[0].name; // undefined
docs[1].name; // undefined
docs[0].email; // 'bill@startup.co'
docs[1].email; // 'john@gmail.com'
*/

/*
const docs = await User.find().sort({ name: 1 }).select("+email"); // Note the `+` here
docs[0].name; // Bill Johnson
docs[1].name; // John Smith
docs[0].email; // 'bill@startup.co'
docs[1].email; // 'john.smith@gmail.com'
*/

/*
const schema = Schema({ name: String });
const Character = mongoose.model("Character", schema);
const ObjectId = mongoose.Types.ObjectId;
const _id = "5dd57639649ce0bd87750caa";
await Character.create([{ _id: ObjectId(_id), name: "Will Riker" }]);

// Works even though `_id` is a string
const doc = await Character.findOne({ _id });
doc._id instanceof ObjectId; // true
doc._id === _id; // false
*/

/*
const schema = Schema({ name: String, age: Number });
const Character = mongoose.model("Character", schema);

await Character.create([{ name: "Will Riker", age: 29 }]);
const filter = { name: "Will Riker" };
// Even though `age` is a string, Mongoose will cast `age` to a
// number because that's the type in `schema`.
const update = { age: "30" };
const opts = { new: true };

const doc = await Character.findOneAndUpdate(filter, update, opts);
doc.age; // 30, as a number
*/

/*
// This `findOneAndUpdate()` will error out because Mongoose can't
// cast the string 'not a number' to a number.
const filter = { name: "Will Riker" };
const update = { age: "not a number" };
const opts = { new: true };
const err = await Character.findOneAndUpdate(filter, update, opts).catch(
  (err) => err
);
// 'Cast to number failed for value "not a number" at path "age"'
err.message;
err.name; // 'CastError'
*/

/*
const filter = { age: { $gte: "fail" } };
const err = await Character.findOne(filter).catch((err) => err);
// 'Cast to number failed for value "fail" at path "age" for
// model "Character"'
err.message;
err.name; // 'CastError'
*/
/*
const schema = Schema({
  name: String,
  rank: { type: String, enum: ["Captain", "Commander"] },
});

const Character = mongoose.model("Character", schema);
await Character.create([{ name: "Will Riker", rank: "Commander" }]);

// By default, Mongoose will let the below update go through, even
// though 'Lollipop' is not in the `enum` of allowed values.
const update = { rank: "Lollipop" };
let opts = { new: true };
const doc = await Character.findOneAndUpdate({}, update, opts);
doc.rank; // 'Lollipop'

// But if you set `runValidators`, Mongoose will run the `enum`
// validator and reject because of an invalid `rank`.
opts = { runValidators: true };
const err = await Character.findOneAndUpdate({}, update, opts).catch(
  (err) => err
);
// '`Lollipop` is not a valid enum value for path `rank`.'
err.message;
err.name; // 'ValidationError'
*/

/*
let opts = { runValidators: true };
// Mongoose executes the below query without error
await Character.findOne({ rank: "Lollipop" }).setOptions(opts);
*/

/*
// Mongoose will let the below upsert through, which will store
// an invalid `rank` in the database.
const filter = { rank: "Lollipop" };
const update = { name: "test" };
const opts = { runValidators: true, upsert: true, new: true };
const doc = await Character.findOneAndUpdate(filter, update, opts);
doc.rank; // 'Lollipop'
*/

/*
// Insert an invalid doc in the database
const doc = { _id: new mongoose.Types.ObjectId(), rank: "Lollipop" };
await Character.collection.insertOne(doc);
// Below update succeeds, even though the document in the database
// has an invalid `rank`
await Character.updateOne({ _id: doc._id }, { name: "Test" });
*/

/*
const schema = Schema({
  name: String,
  age: Number,
  rank: { type: String, validate: ageRankValidator },
});

function ageRankValidator(v) {
  const message = "Captains must be at least 30";
  assert(v !== "Captain" || this.age >= 30, message);
}

const Character = mongoose.model("Character", schema);

const rank = "Captain";
const doc = new Character({ name: "Will Riker", age: 29, rank });
const err = await doc.save().catch((err) => err);
// 'Character validation failed: rank: Captains must be at least 30'
err.message;
*/

function ageRankValidator(v) {
  const message = "Captains must be at least 30";
  if (this instanceof mongoose.Query) {
    const update = this.getUpdate();
    assert(v !== "Captain" || update.$set.age >= 30, message);
  } else {
    assert(v !== "Captain" || this.age >= 30, message);
  }
}

const update = { age: 29, rank: "Captain" };

// The `context` option tells Mongoose to set the value of `this`
// in the validator to the query. Otherwise `this` will be `null`
const opts = { runValidators: true, context: "query" };

// Throws 'Validation failed: rank: Captains must be at least 30'
await Character.findOneAndUpdate({}, update, opts);
