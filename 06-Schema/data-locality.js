const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const blogPostSchema = Schema({
  title: String,
  content: String,
  authorId: String,
  // Denormalize all the details to render the blog post,
  // avoiding extra `populate()` calls.
  author: userSchema.pick(["name", "email"]),
  tags: [String],
});
*/

/*
const userSchema = Schema({ name: String, email: String, age: Number });
// When updating a user, update all blog posts and comments.
userSchema.post("save", async function () {
  const update = { $set: { author: this } };
  await BlogPost.updateMany({ authorId: this._id }, update);
});
const User = mongoose.model("User", userSchema);

const blogPostSchema = Schema({
  title: String,
  content: String,
  authorId: mongoose.ObjectId,
  author: userSchema.pick(["name", "email"]),
  tags: [String],
});
// `BlogPost.author` embeds information from 'User'
const BlogPost = mongoose.model("BlogPost", blogPostSchema);
*/

const vehicleSchema = Schema({
  make: String,
  model: String,
  plate: String,
  ownerId: mongoose.ObjectId,
});

const parkingSchema = Schema({
  endsAt: Date,
  vehicleId: mongoose.ObjectId,
  vehicle: vehicleSchema.pick(["plate"]),
});
