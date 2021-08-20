const mongoose = require("mongoose");
const { Schema, model } = mongoose;
require("./1.2-connecting-to-mongodb");

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
  const product = new Product({
    name: "iPhone",
    price: "800", // Note that this is a string, not a number
    notInSchema: "foo",
  });
  await product.save();
};

// connectToDB();
addNewProduct();

// product.name; // 'iPhone'
// product.price; // 800, Mongoose converted this to a number
// // undefined, Mongoose removes props that aren't in the schema
// product.notInSchema;
