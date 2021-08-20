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

// Connection Events

// Emitted when Mongoose successfully makes its initial connection to the MongoDB server,
// or when Mongoose reconnects after losing connectivity.
// Equivalent to open event
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB successfully");
});

// Emitted if an error occurs on a connection, like a parseError due to malformed data or
// a payload larger than 16MB.
mongoose.connection.on("error", (err) => {
  console.error(`Connection error : ${err.message}`);
});

// Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your
// code explicitly closing the connection, the database server crashing, or network connectivity
// issues.
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", async () => {
  await mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
  });
  process.exit(0);
});

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
