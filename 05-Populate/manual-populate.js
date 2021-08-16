const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const countrySchema = Schema({
  name: String,
  capital: { type: "ObjectId", ref: "City" },
});

const Country = mongoose.model("Country", countrySchema);

const City = mongoose.model("City", Schema({ name: String }));

const country = await Country.create({ name: "Switzerland" });
country.capital = new City("Bern");
country.capital.name; // 'Bern'
!!country.populated("capital"); // true
*/

/*
const Country = mongoose.model(
  "Country",
  Schema({
    name: String,
    cities: [{ type: mongoose.ObjectId, ref: "City" }],
  })
);

const City = mongoose.model("City", Schema({ name: String }));

const country = await Country.create({ name: "Switzerland" });
country.cities = [new City("Bern"), new City("Basel")];
country.cities[0].name; // 'Bern'
!!country.populated("cities"); // true
*/

const country = await Country.create({ name: "Switzerland" });
const city = await City.create({ name: "Bern" });
// The 2nd doc isn't a city, so Mongoose depopulates the array.
country.cities = [city, country];
country.cities[0].name; // undefined
!!country.populated("cities"); // false
