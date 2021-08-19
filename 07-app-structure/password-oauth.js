const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const User = mongoose.model(
  "User",
  Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  })
);

// Later
const bcrypt = require("bcryptjs");
const promisify = require("util").promisify;

// Hash password before storing
let pw = await promisify(bcrypt.hash).call(bcrypt, "taco", 3);
await User.create({
  email: "taco@theleague.com",
  password: pw,
});
*/

/*
const User = mongoose.model(
  "User",
  Schema({
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      // `password` will be excluded when you do `User.find()`
      // unless you explicitly project it in.
      select: false,
    },
  })
);

let user = await User.findOne();
user.password; // undefined
user = await User.findOne().select("+password");
user.password; // String containing password hash
*/

const schema = Schema({
  type: {
    type: String,
    enum: ["PASSWORD", "FACEBOOK_OAUTH"],
  },
  // `secret` stores the password hash for password auth,
  // or the access token for Facebook OAuth.
  secret: String,
  user: { type: ObjectId, ref: "User" },
});
const AuthenticationMethod = mongoose.model("AuthenticationMethod", schema);
