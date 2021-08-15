const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const schema = Schema({ name: String });

schema.pre("save", function () {
  const condition = doc === this; // true
  console.log(`doc === this : ${condition}`);
});

const Model = mongoose.model("Test", schema);

const doc = new Model({ name: "test" });
// When you call `doc.save()`, Mongoose calls your pre save middleware
// with `this` equal to `doc`.
await doc.save();
*/

/*
const schema = Schema({ name: String });

schema.post("save", function (res) {
  let condition = res === this;
  console.log(`res === this : ${condition}`); // true

  condition = res === doc;
  console.log(`res === doc : ${condition}`); // true
});

const Model = mongoose.model("Test", schema);

const doc = new Model({ name: "test" });
// When you call `doc.save()`, Mongoose calls your post save middleware
// with `res` equal to `doc`.
await doc.save();
*/

const schema = Schema({ name: String });

schema.post(["save", "validate", "remove"], function (res) {
  let condition = res === this;
  console.log(`res === this : ${condition}`); // true

  condition = res === doc;
  console.log(`res === doc : ${condition}`); // true
});

const Model = mongoose.model("Test", schema);

const doc = new Model({ name: "test" });

// Triggers post('validate') hook
await doc.validate();

// Triggers post('save') **and** post('validate') hook
await doc.save();

// Triggers post('remove') hook
await doc.remove();
