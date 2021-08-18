const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

let schema = Schema({ firstName: String, lastName: String });
schema.index({ firstName: 1, lastName: 1 });
const User = mongoose.model("User", schema);

const findUserByName = async () => {
  const firstName = "Agent";
  const lastName = "Smith";

  const res = await User.findOne({ firstName, lastName }).explain();
  // Object with properties like `queryPlanner` & `executionStats`
  console.log(res);
};

connectToDB();
findUserByName();

// queryPlanner: {
//     plannerVersion: 1,
//     namespace: 'mydb.users',
//     indexFilterSet: false,
//     parsedQuery: { '$and': [Array] },
//     winningPlan: { stage: 'LIMIT', limitAmount: 1, inputStage: [Object] },
//     rejectedPlans: []
//   }
