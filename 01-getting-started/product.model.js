const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
require("./1.2-connecting-to-mongodb");

const productSchema = new Schema({
  sku: { type: String },
  title: { type: String, lowercase: true },
  price: Number,
});

const Product = model("product", productSchema);

const newProduct = {
  sku: "lap1337",
  title: "awesome laptop",
  price: 3.99,
};

/*
// 1. Instantiate a model instance to create a new document
const addNewProduct = async () => {
  const product = new Product(newProduct);
  await product.save();
};
*/

/*
// 2. Use model class create method
const addNewProduct = async () => {
  const productToCreate = await Product.create(newProduct);
  return productToCreate;
};
*/

// addNewProduct();

/*
// using findOne
const findProduct = async () => {
  try {
    const productToFind = await Product.findOne({ sku: "lap1337" })
      .lean()
      .exec();
    console.log(productToFind); // print newProduct
    return productToFind;
  } catch (e) {
    console.error(e);
  }
};

const productToFind = findProduct();
console.log(productToFind.then((product) => product)); // return Promise { <pending> } WHY ??
console.log(productToFind); // return Promise { <pending> } WHY ??
*/

// using findOne
const findProduct = async () => {
  try {
    const products = await Product.find().lean().exec();
    const { sku, title, price } = products[0];
    console.log({ sku, title, price }); // print newProduct
    return products[0];
  } catch (e) {
    console.error(e);
  }
};

const productToFind = findProduct();
// console.log(productToFind.then((product) => product)); // return Promise { <pending> } WHY ??
console.log(productToFind); // return Promise { <pending> } WHY ??
