const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
// `$lte` is an example of a query selector
const filter = { age: { $lte: 30 } };
const docs = await Model.find(filter);
*/

/*
const querySelectors = { $gt: 50, $lt: 60 };
const filter = { age: querySelectors };
*/

/*
// Matches if the `age` property is exactly equal to 42
let filter = { age: { $eq: 42 } };

// Matches if the `age` property is a number between 30 and 40
filter = { age: { $gte: 30, $lt: 40 } };

// Matches if `name` is 'Jean-Luc Picard' or 'Will Riker'
filter = { name: { $in: ["Jean-Luc Picard", "Will Riker"] } };

// Matches if `name` is a string containing 'picard', ignoring case
filter = { name: { $regex: /picard/i } };
*/

/*
const schema = Schema({ name: String, age: Number, rank: String });
const Model = mongoose.model("Model", schema);

await Model.create({ name: "Will Riker", age: 29 });

// Finds the doc, because there's an `age` property
let doc = await Model.findOne({ age: { $exists: true } });

// Does **not** find the doc, no `rank` property
doc = await Model.findOne({ rank: { $exists: true } });

// Finds the doc, because there's no `rank` property
doc = await Model.findOne({ rank: { $exists: false } });

// Finds the doc, because `$exists: true` matches `null` values.
// `$exists` is analagous to a JavaScript `in` or `hasOwnProperty()`
await Model.updateOne({}, { rank: null });
doc = await Model.findOne({ rank: { $exists: true } });
*/

/*
const schema = Schema({ name: String, age: Number, rank: String });
const Model = mongoose.model("Model", schema);

await Model.create({ name: "Will Riker", age: 29 });

// Finds the doc, because `age` is a number
let doc = await Model.findOne({ age: { $type: "number" } });

// Does **not** find the doc, because the doc doesn't
// have a `rank` property.
doc = await Model.findOne({ rank: { $type: "string" } });
*/

/*
const schema = Schema({ name: String, age: Number, rank: String });
const Model = mongoose.model('Model', schema);

await Model.create({ name: 'Will Riker', age: 29 });

// Finds the doc. Mongoose stores `age` as an int
let doc = await Model.findOne({ age: { $type: 'int' } });
doc.age = 29.5;
await doc.save();

// Does **not** find the doc: `age` is no longer an int
doc = await Model.findOne({ age: { $type: 'int' } });

// Finds the doc, `age` is now a double
doc = await Model.findOne({ age: { $type: 'double' } });

// Finds the doc, 'number' matches both ints and doubles.
doc = await Model.findOne({ age: { $type: 'number' } });
*/

/*
const schema = Schema({ name: String, age: Number, rank: String });
const Model = mongoose.model("Model", schema);

await Model.create({ name: "Will Riker", age: 29 });

// Finds the doc, because Mongoose stores `age` as an int
const querySelector = { $not: { $type: "string" } };
let doc = await Model.findOne({ age: querySelector });

// Finds the doc, because `doc` doesn't have a `rank` property
doc = await Model.findOne({ rank: querySelector });
*/

/*
const State = mongoose.model(
  "State",
  Schema({
    name: String,
    location: {
      type: { type: String },
      coordinates: [[[Number]]],
    },
  })
);
// The US state of Colorado is roughly a geospherical rectangle
await State.create({
  name: "Colorado",
  location: {
    type: "Polygon",
    coordinates: [
      [
        [-109, 41],
        [-102, 41],
        [-102, 37],
        [-109, 37],
        [-109, 41],
      ],
    ],
  },
});
*/

/*
// Approximate coordinates of the capital of Colorado
const denver = { type: "Point", coordinates: [-104.9903, 39.7392] };

// Approximate coordinates of San Francisco
const sf = { type: "Point", coordinates: [-122.5, 37.7] };

let doc = await State.findOne({
  location: {
    // You need to specify `$geometry` if you're using `$geoIntersects` with geoJSON.
    $geoIntersects: { $geometry: denver },
  },
});

doc.name; // 'Colorado'

doc = await State.findOne({
  location: {
    $geoIntersects: { $geometry: sf },
  },
});

doc; // null
*/

/*
const City = mongoose.model(
  "City",
  Schema({
    name: String,
    location: {
      type: { type: String },
      coordinates: [Number],
    },
  })
);

let location = { type: "Point", coordinates: [-104.99, 39.739] };
await City.create({ name: "Denver", location });
const colorado = await State.findOne();
const $geoWithin = { $geometry: colorado.location };
let doc = await City.findOne({ location: { $geoWithin } });
doc.name; // 'Denver'

// `$geoIntersects` also finds that Denver is in Colorado
const $geoIntersects = { $geometry: colorado.location };
doc = await City.findOne({ location: { $geoIntersects } });
*/

/*
const sfCoordinates = [-122.5, 37.7];

// $centerSphere distance is in radians, so convert miles to radians
const distance = 1000 / 3963.2;
const $geoWithin = { $centerSphere: [sfCoordinates, distance] };

let doc = await City.findOne({ location: { $geoWithin } });

// `doc` will be `null`
$geoWithin.$centerSphere[1] = distance / 2;
doc = await City.findOne({ location: { $geoWithin } });
*/

/*
const createCity = (name, coordinates) => ({
  name,
  location: { type: "Point", coordinates },
});

await City.create([
  createCity("Denver", [-104.9903, 39.7392]),
  createCity("San Francisco", [-122.5, 37.7]),
  createCity("Miami", [-80.13, 25.76]),
]);

// Create a 2dsphere index, otherwise `$nearSphere` will error out
await City.collection.createIndex({ location: "2dsphere" });

// Find cities within 2000 miles of New York, sorted by distance
const $geometry = { type: "Point", coordinates: [-74.26, 40.7] };

// `$nearSphere` distance is in meters, so convert miles to meters
const $maxDistance = 2000 * 1609.34;
const cities = await City.find({
  location: { $nearSphere: { $geometry, $maxDistance } },
});

cities[0].name; // 'Miami'
cities[1].name; // 'Denver'
*/

/*
let s = Schema({ comments: [{ user: String, text: String }] });

const BlogPost = mongoose.model("BlogPost", s);

await BlogPost.create([
  { comments: [{ user: "jpicard", text: "Make it so!" }] },
  { comments: [{ user: "wriker", text: "One, or both?" }] },
]);

const docs = await BlogPost.find({ "comments.user": "jpicard" });
docs.length; // 1
*/

/*
let s = Schema({ comments: [{ user: String, text: String }] });

const BlogPost = mongoose.model("BlogPost", s);

await BlogPost.create([
  { comments: [{ user: "jpicard", text: "Make it so!" }] },
  { comments: [{ user: "wriker", text: "One, or both?" }] },
  { comments: [{ user: "wriker" }, { user: "jpicard" }] },
]);

// Find all blog posts that both 'wriker' and 'jpicard' commented on.
const $all = ["wriker", "jpicard"];
let docs = await BlogPost.find({ "comments.user": { $all } });
docs.length; // 1

// Find all blog posts that 'jpicard' commented on.
docs = await BlogPost.find({ "comments.user": "jpicard" });
docs.length; // 2
*/

/*
// Find all blog posts that have exactly 2 comments
const comments = { $size: 2 };
let docs = await BlogPost.find({ comments });
docs.length; // 1
*/

/*
await BlogPost.create([
  { comments: [{ user: "jpicard", text: "Make it so!" }] },
  { comments: [{ user: "wriker", text: "One, or both?" }] },
  {
    comments: [
      { user: "wriker", text: "Make it so!" },
      { user: "jpicard", text: "That's my line!" },
    ],
  },
]);

// Finds 2 documents, because this query finds blog posts where
// 'jpicard' commented, and where someone commented 'Make it so!'.
let docs = await BlogPost.find({
  "comments.user": "jpicard",
  "comments.text": "Make it so!",
});
docs.length; // 2

*/

await BlogPost.create([
  { comments: [{ user: "jpicard", text: "Make it so!" }] },
  { comments: [{ user: "wriker", text: "One, or both?" }] },
  {
    comments: [
      { user: "wriker", text: "Make it so!" },
      { user: "jpicard", text: "That's my line!" },
    ],
  },
]);

// `$elemMatch` is like a nested filter for array elements.
const $elemMatch = { user: "jpicard", comment: "Make it so!" };
let docs = await BlogPost.find({ comments: { $elemMatch } });
docs.length; // 1
