const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
// Opt in to Mongoose putting virtuals in `toJSON()` output
// for `JSON.stringify()`, and in `toObject()` output.

const options = { toJSON: { virtuals: true } };
const userSchema = Schema({ email: String }, options);

userSchema.virtual("domain").get(function () {
  return this.email.slice(this.email.indexOf("@") + 1);
});

const User = model("user", userSchema);

const addNewUser = async () => {
  const doc = await User.create({ email: "test@gmail.com" });

  // { _id: ..., email: 'test@gmail.com', domain: 'gmail.com' }
  console.log(doc.toJSON());

  // {"_id":...,"email":"test@gmail.com","domain":"gmail.com"}
  console.log(JSON.stringify(doc));
};

connectToDB();
addNewUser();
*/

// -----------------------------------------

const myObject = {
  toJSON: function () {
    // Will print once when you call `JSON.stringify()`.
    console.log("Called!");
    return 42;
  },
};
// `{"prop":42}`. That is because `JSON.stringify()` uses the result
// of the `toJSON()` function.
console.log(JSON.stringify({ prop: myObject }));

mongoose.set("toJSON", { virtuals: true });
