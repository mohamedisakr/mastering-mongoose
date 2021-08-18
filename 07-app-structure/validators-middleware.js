const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const profileSchema = Schema({
  photos: [String],
  status: { type: String, enum: ["PENDING", "PUBLISHED"] },
});
*/

/*
const profileSchema = Schema({
  photos: {
    type: [String],
    validate: function (v) {
      return this.status !== "PUBLISHED" || (v && v.length > 1);
    },
  },
  status: { type: String, enum: ["PENDING", "PUBLISHED"] },
});
*/

/*
const profileSchema = Schema({
  photos: [String],
  status: {
    type: String,
    enum: ["PENDING", "PUBLISHED"],
  },
});

profileSchema.pre("save", function () {
  if (this.status === "PUBLISHED" && this.photos.length < 2) {
    throw Error("Published profile must have at least 2 photos");
  }
});
*/

/*
const Profile = mongoose.model(
  "Profile",
  Schema({
    photos: {
      type: [String],
      validate: function (v) {
        if (this.status !== "PUBLISHED") return true;
        return v != null && v.length >= 2;
      },
    },
    status: {
      type: String,
      enum: ["PENDING", "PUBLISHED"],
    },
  })
);

const doc = await Profile.create({ status: "PENDING" });
doc.status = "PUBLISHED";
// Doesn't throw because `photos` is not modified.
await doc.save();
*/

/*
const Profile = mongoose.model(
  "Profile",
  Schema({
    publishedAt: {
      type: Date,
      required: function () {
        return this.status === "PUBLISHED";
      },
    },
    status: {
      type: String,
      enum: ["PENDING", "PUBLISHED"],
    },
  })
);

const addProfile = async () => {
  const doc = await Profile.create({ status: "PENDING" });
  doc.status = "PUBLISHED";
  const err = await doc.save().catch((err) => err);
  console.log(err.message); // Profile validation failed: publishedAt: Path `publishedAt` is required.
};

connectToDB();
addProfile();
*/
