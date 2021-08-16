const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
// One-to-many relationships: Order - Product, Product - Category
const Order = mongoose.model(
  "Order",
  Schema({
    products: [{ type: mongoose.ObjectId, ref: "Product" }],
  })
);

const Product = mongoose.model(
  "Product",
  Schema({
    name: String,
    categories: [{ type: mongoose.ObjectId, ref: "Category" }],
  })
);

const categorySchema = Schema({ name: String });
const Category = mongoose.model("Category", categorySchema);

// Create sample documents
const phones = await Category.create({ name: "Phones" });
const books = await Category.create({ name: "Books" });

const [iphone, book] = await Product.create([
  { name: "iPhone", categories: [phones] },
  { name: "Snow Crash", categories: [books] },
]);

await Order.create({ products: [iphone, book] });
await Order.create({ products: [book] });

// Deep populate `products` and `products.categories`
const orders = await Order.find()
  .sort({ name: -1 })
  .populate({
    path: "products",
    // The `populate` option populates each product's categories
    populate: { path: "categories" },
  });
orders[0].products[0].categories[0].names; // 'Phones'
*/

/**/

/*
const User = mongoose.model(
  "User",
  Schema({
    name: String,
    friends: [{ type: mongoose.ObjectId, ref: "User" }],
  })
);

const luke = await User.create({ name: "Luke Skywalker" });
const yoda = await User.create({ name: "Yoda", friends: [luke] });
await User.create({ name: "Mace Windu", friends: [yoda] });

// Populate Mace Windu's friends of friends
const doc = await User.findOne({ name: "Mace Windu" }).populate({
  path: "friends",
  populate: { path: "friends" },
});

doc.friends[0].friends[0].name; // 'Luke Skywalker'
*/

const User = mongoose.model(
  "User",
  Schema({
    name: String,
    friends: [{ type: mongoose.ObjectId, ref: "User" }],
  })
);

const han = await User.create({ name: "Han Solo" });
const luke = await User.create({ name: "Luke", friends: [han] });
const yoda = await User.create({ name: "Yoda", friends: [luke] });

await User.create({ name: "Mace Windu", friends: [yoda] });
// Populate Mace Windu's friends of friends of friends
const path = "friends";
const doc = await User.findOne({ name: "Mace Windu" }).populate({
  path,
  populate: { path, populate: { path } },
});
doc.friends[0].friends[0].friends[0].name; // 'Han Solo'
