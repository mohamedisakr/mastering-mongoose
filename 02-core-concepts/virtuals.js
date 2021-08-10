const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

const userSchema = Schema({ email: String });

userSchema.virtual("domain").get(function () {
  return this.email.slice(this.email.indexOf("@") + 1);
});

const User = model("user", userSchema);

const addNewUser = async () => {
  let doc = await User.create({ email: "test@gmail.com" });
  console.log(doc.domain); // 'gmail.com'

  // Mongoose ignores setting virtuals that don't have a setter
  doc.set({ email: "test@test.com", domain: "foo" });
  console.log(doc.domain); // 'test.com
};

connectToDB();
addNewUser();

await User.create({ email: "test@gmail.com" });
// `doc` will be null, because the document in the database
// does **not** have a `domain` property
const doc = await User.findOne({ domain: "gmail.com" });
