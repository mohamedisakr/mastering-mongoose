const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const countrySchema = Schema({ name: String });
const Country = mongoose.model("Country", countrySchema);

const City = mongoose.model(
  "City",
  Schema({
    name: String,
    country: { type: mongoose.ObjectId, ref: "Country" },
  })
);

const country = await Country.create({ name: "United States" });
const { name } = await City.create({ name: "NYC", country });
await City.create({ name: "Miami", country });

const nyc = await City.findOne({ name }).populate("country");
nyc.country.name; // 'United States'
*/

/*
const countrySchema = Schema({ name: String });
countrySchema.virtual("cities", {
  ref: "City",
  localField: "_id",
  foreignField: "country",
  justOne: false,
});
const Country = mongoose.model("Country", countrySchema);

const schema = Schema({ name: String, country: "ObjectId" });
const City = mongoose.model("City", schema);

let usa = await Country.create({ name: "United States" });
let canada = await Country.create({ name: "Canada" });

await City.create({ name: "New York", country: usa });
await City.create({ name: "Miami", country: usa });
await City.create({ name: "Vancouver", country: canada });

usa = await Country.findById(usa._id).populate("cities");
usa.cities.map((city) => city.name); // ['New York', 'Miami']
*/

const countrySchema = Schema({
  name: String,
  // You can also represent one-to-many as an array of ObjectIds
  cities: [{ type: ObjectId, ref: "City" }],
});
const Country = mongoose.model("Country", countrySchema);
const City = mongoose.model("City", Schema({ name: String }));
