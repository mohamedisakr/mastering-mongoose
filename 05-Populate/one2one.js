const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const Country = mongoose.model(
  "Country",
  Schema({
    name: String,
    capital: { type: "ObjectId", ref: "City" },
  })
);

const City = mongoose.model("City", Schema({ name: String }));

const dc = await City.create({ name: "Washington, D.C." });
const manila = await City.create({ name: "Manila" });

const [{ name }] = await Country.create([
  { name: "United States", capital: dc },
  { name: "Phillipines", capital: manila },
]);

const usa = await Country.findOne({ name }).populate("capital");
usa.capital.name; // 'Washington, D.C.'
*/

const schema = Schema({ name: String, capitalId: ObjectId });

schema.virtual("capital", {
  ref: "City",
  localField: "capitalId",
  foreignField: "_id",
  justOne: true,
});

const Country = mongoose.model("Country", schema);
const City = mongoose.model("City", Schema({ name: String }));

const oslo = await City.create({ name: "Oslo" });
const bern = await City.create({ name: "Bern" });

await Country.create({ name: "Norway", capitalId: oslo });
await Country.create({ name: "Switzerland", capitalId: bern });

let v = await Country.findOne({ name: "Norway" }).populate("capital");
v.capital.name; // 'Oslo'
