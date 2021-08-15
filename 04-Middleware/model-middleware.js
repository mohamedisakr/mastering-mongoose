const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

const schema = Schema({ name: String });

schema.post("insertMany", function (res) {
  let condition = this === Model;
  console.log(`this === Model : ${condition}`); // true

  condition = res[0] instanceof Model; // true
  console.log(`res[0] instanceof Model : ${condition}`);

  res[0].name; // 'test'
});

const Model = mongoose.model("Test", schema);

// Triggers `post('insertMany')` hooks
await Model.insertMany([{ name: "test" }]);
