const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
// If you want to change the rank 'Captain' to be 'Director',
// you would need to update every `Character` document.
const schema = Schema({ name: String, rank: String });
const Character = mongoose.model("Character", schema);
await Character.updateMany({ rank: "Captain" }, { rank: "Director" });
*/

/*
const User = mongoose.model(
  "User",
  Schema({
    name: String,
    rank: { type: ObjectId, ref: "Rank" },
  })
);

const Rank = mongoose.model("Rank", Schema({ name: String }));

const captain = await Rank.create({ name: "Captain" });
const commander = await Rank.create({ name: "Commander" });

await User.create({ name: "James T. Kirk", rank: captain });
await User.create({ name: "Spock", rank: commander });

// The `match` option only affects the populated documents.
// This query says to find all users, sort them by name,
// and then populate their `rank` only if `name = 'Captain'`
const docs = await User.find()
  .sort({ name: 1 })
  .populate({
    path: "rank",
    match: { name: "Captain" },
  });
docs.length; // 2
docs[1].name; // Spock
docs[1].rank; // null
*/

/*
const User = mongoose.model("User", Schema({ name: String }));

const Car = mongoose.model(
  "Car",
  Schema({
    description: String,
    licensePlate: String,
    owner: { type: ObjectId, ref: "User" },
  })
);

// Find users whose name contains 'Crockett'. What if you also
// want to filter by users that have a car whose license plate
// starts with 'ZAQ'?
await User.find({ name: /Crockett/ });
*/

const userSchema = Schema({ name: String, licensePlates: [String] });
const carSchema = Schema({
  licensePlate: String,
  owner: { type: ObjectId, ref: "User" },
});

// Use middleware to update the corresponding user's
// license plates whenever we update a vehicle.
carSchema.post("save", async function () {
  const allCars = await Car.find({ owner: this.owner });
  const licensePlates = allCars.map((car) => car.licensePlate);
  await User.updateOne({ _id: this.owner }, { licensePlates });
});

const User = mongoose.model("User", userSchema);
const Car = mongoose.model("Car", carSchema);

const owner = await User.create({ name: "Sonny Crockett" });
await User.create({ name: "Davy Crockett" });

await Car.create({ licensePlate: "ZAQ178", owner });

let doc = await User.findOne({ licensePlates: /ZAQ/ });
doc.name; // 'Sonny Crockett'
