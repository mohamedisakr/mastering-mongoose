const mongoose = require("mongoose");
const { Schema, model } = mongoose;
require("../01-getting-started/1.2-connecting-to-mongodb");

// const schema = Schema({ name: String, age: Number });
// const MyModel = model("MyModel", schema);
// const doc = new MyModel({});
// doc.age = "not a number";
// // Throws CastError: Cast to Number failed for value
// // "not a number" at path "age"
// doc.save();

//====================================================

/*
const schema = Schema({ name: String, age: Number });
const Person = mongoose.model("Person", schema);
const doc = new Person({ name: "Jean-Luc Picard", age: 59 });

doc.age = null;
doc.name = undefined;
// Succeeds, because Mongoose casting lets `null` and `undefined`.
// `name` and `age` will _both_ be `null` in the database.
await doc.save();
*/

//====================================================

/*
const personSchema = Schema({ name: String, age: Number });
const Student = model("student", schema);
const doc = new Student({});
doc.age = "NaN";
// Throws CastError: Cast to Number failed for value
// "not a number" at path "age"
await doc.save();
*/

//====================================================

const productSchema = new Schema({ name: String, price: Number });
const Product = model("product", productSchema);

// MongoDB Node.js driver does not support undefined
// const newProduct = Product.create({ name: null, price: undefined });

const newProduct = Product.create({ name: null, price: null });
const foundProduct = Product.findOne().lean().exec();
console.log(foundProduct); // returns Promise { <pending> }
