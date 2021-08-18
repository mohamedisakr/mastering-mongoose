/*
const mongoose = require("mongoose");
module.exports = mongoose.model(
  "User",
  mongoose.Schema({
    name: String,
    email: String,
  })
);
*/

/*
const mongoose = require("mongoose");
require("./connect");
module.exports = mongoose.model(
  "User",
  mongoose.Schema({
    name: String,
    email: String,
  })
);
*/

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

require("mongoose")
  .connect(process.env.MONGODB_URI, opts)
  .catch((err) => {
    // If there's an error connecting to MongoDB, throw an uncaught error
    // that kills the process.
    process.nextTick(() => {
      throw err;
    });
  });
