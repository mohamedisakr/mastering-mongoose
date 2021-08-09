const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { connectToDB } = require("./1.2-connecting-to-mongodb");

const productSchema = new Schema({
  // A product has two properties: `name` and `price`
  name: { type: String, lowercase: true },
  price: Number,
});

// The `mongoose.model()` function has 2 required parameters:
// The 1st param is the model's name, a string
// The 2nd param is the schema
const Product = model("product", productSchema);

const addNewProduct = async () => {
  const productToCreate = await Product.create({
    name: "honor 7c",
    price: "280", // Note that this is a string, not a number
    notInSchema: "foo",
  });
  return productToCreate;
};

const getProduct = async () => {
  const productToFind = await Product.findOne().lean().exec();
  return productToFind;
};

const getProductList = async () => {
  const productToFind = await Product.find({}).lean().exec();
  return productToFind;
};

connectToDB();
// addNewProduct();
// console.log(getProduct());
// const result = await getProductList();
// console.log(getProductList());

// let product = await Product.findOne();
// product.name; // "iPhone"
// product.price; // 800
// console.log(product);

// const products = await Product.find();
// product = products[0];
// product.name; // "iPhone"
// product.price; // 800
// console.log(product);
