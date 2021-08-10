const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId } = mongoose;

const userSchema = Schema({ email: String, domain: String });

// Whenever you set `email`, make sure you update `domain`.
userSchema.path("email").set(function (v) {
  // In a setter function, `this` may refer to a document or a query.
  // If `this` is a document, you can modify other properties.
  this.domain = v.slice(v.indexOf("@") + 1);
  return v;
});

const User = model("User", userSchema);
const user = new User({ email: "test@gmail.com" });
console.log(user.email); // 'test@gmail.com'
console.log(user.domain); // 'gmail.com'

// --------------------------------------------

// Since `domain` is a real property, you can `set()` it and
// overwrite the computed value.
let user = new User({ email: "test@gmail.com", domain: "oops" });
user.domain; // 'oops'
// Setters are order dependent. If `domain` is the first key,
// the setter will actually work.
user = new User({ domain: "oops", email: "test@gmail.com" });
user.domain; // 'gmail.com'

// ------------------------------------------------------

const userSchema = Schema({ email: String, domain: String });

userSchema.path("email").set(function setter(v) {
  const domain = v.slice(v.indexOf("@") + 1);
  // Queries and documents both have a `set()` function
  this.set({ domain });
  return v;
});

const User = model("User", userSchema);

let doc = await User.create({ email: "test@gmail.com" });
console.log(doc.domain); // 'gmail.com'

// The setter will also run on `updateOne()`
const { _id } = doc;
const $set = { email: "test@test.com" };

await User.updateOne({ _id }, { $set });
doc = await User.findOne({ _id });
console.log(doc.domain); // 'test.com'
