const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const schema = new Schema({
//   name: {
//     type: String,
//     // `enum` adds a validator to `name`. The built-in `enum`
//     // validator ensures `name` will be one of the below values.
//     enum: ["Jean-Luc Picard", "William Riker", "Deanna Troi"],
//   },
// });

// const Person = model("Person", schema);

// const doc = new Person({ name: "Kathryn Janeway" });

// doc.save().catch((error) => {
//   // ValidationError: Person validation failed: name:
//   // `Kathryn Janeway` is not a valid enum value for path `name`.
//   error;
//   // ValidatorError: `Kathryn Janeway` is not a valid enum
//   // value for path `name`.
//   error.errors["name"];
//   Object.keys(error.errors); // ['name']
// });

// const schema = new Schema({
//   age: {
//     type: Number,
//     enum: [59, 60, 61],
//   },
// });
// const Person = model("Person", schema);
// const doc = new Person({ age: 22 });
// // No error, `enum` does nothing for `type: Number`
// await doc.validate();

const schema = new Schema({
  name: {
    type: String,
    // Adds the `required` validator to the `name` path
    required: true,
  },
});
const Person = model("Person", schema);
const doc = new Person({ name: null });
await doc.validate().catch((error) => {
  // ValidationError: Person validation failed: name: Path
  // `name` is required.
  error;
  // ValidatorError: Path `name` is required.
  error.errors["name"];
});
