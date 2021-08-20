const mongoose = require("mongoose");
const { uri, connectionOptions } = require("../constants/mongoose-connection");

mongoose
  .connect(uri, connectionOptions)
  .then(() => {
    console.log("mongodb connnected");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB successfully");
});

mongoose.connection.on("error", (err) => {
  console.error(`Connection error : ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// module.exports = { connectToDB };

// const connectToDB = async () => {
//   await mongoose.connect(uri, options);
//   console.log("Connecting to database");
// };

// const connectToDB = async () => {
//   try {
//     const connect = await mongoose.connect(uri, connectionOptions);
//     console.log("mongodb connected");
//   } catch (err) {
//     console.log(err.message);
//   }

//   // .then(() => {
//   //   console.log("mongodb connnected");
//   // })
//   // .catch((err) => {
//   //   console.log(err);
//   // });
// };
