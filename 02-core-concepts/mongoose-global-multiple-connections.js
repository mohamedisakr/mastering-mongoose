// const mongoose = require("mongoose");
// const { Schema, Types, model, ObjectId } = mongoose;
// const {
//   connectToDB,
// } = require("../01-getting-started/1.2-connecting-to-mongodb");

// // Mongoose exports an instance of the `Mongoose` class
// let condition = mongoose instanceof mongoose.Mongoose; // true
// console.log(`mongoose instanceof mongoose.Mongoose : ${condition}`);

/*
const { Mongoose } = require("mongoose");
const mongoose1 = new Mongoose();
const mongoose2 = new Mongoose();
mongoose1.set("toJSON", { virtuals: true });
mongoose1.get("toJSON"); // { virtuals: true }
mongoose2.get("toJSON"); // null
*/

/*
const mongoose = require("mongoose");

const mongoose1 = new mongoose.Mongoose();
const mongoose2 = new mongoose.Mongoose();

let instance = mongoose1.connection instanceof mongoose.Connection; // true
console.log(
  `mongoose1.connection instanceof mongoose.Connection : ${instance}`
);

instance = mongoose2.connection instanceof mongoose.Connection; // true
console.log(
  `mongoose2.connection instanceof mongoose.Connection : ${instance}`
);

const length = mongoose1.connections.length; // 1
console.log(`mongoose1.connections.length : ${length}`);

mongoose1.connections[0] === mongoose1.connection; // true
let readyState = mongoose1.connection.readyState; // 0, 'disconnected'
console.log(`mongoose1.connection.readyState : ${readyState}`);

mongoose1.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
readyState = mongoose1.connection.readyState; // 2, 'connecting'
console.log(`mongoose1.connection.readyState : ${readyState}`);
*/

/*
const mongoose = require("mongoose");
const mongoose1 = new mongoose.Mongoose();

const conn = mongoose1.createConnection("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const length = mongoose1.connections.length; // 2
console.log(`mongoose1.connections.length : ${length}`);

let condition = mongoose1.connections[1] === conn; // true
console.log(`mongoose1.connections[1] === conn : ${condition}`);
*/

const mongoose = require("mongoose");

const conn1 = mongoose.createConnection("mongodb://localhost:27017/db1", {
  useNewUrlParser: true,
});

const conn2 = mongoose.createConnection("mongodb://localhost:27017/db2", {
  useNewUrlParser: true,
});

// Will store data in the 'db1' database's 'tests' collection
const Model1 = conn1.model("Test", mongoose.Schema({ name: String }));

// Will store data in the 'db2' database's 'tests' collection
const Model2 = conn2.model("Test", mongoose.Schema({ name: String }));
