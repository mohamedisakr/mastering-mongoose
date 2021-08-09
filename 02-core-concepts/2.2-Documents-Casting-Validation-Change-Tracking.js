const mongoose = require("mongoose");

const MyModel = mongoose.model("MyModel", new mongoose.Schema({}));
// `MyModel` is a class that extends from `mongoose.Model`, _not_
// an instance of `mongoose.Model`.
let condition = MyModel instanceof mongoose.Model; // false
console.log(`MyModel instanceof mongoose.Model ${condition}`);
condition = Object.getPrototypeOf(MyModel) === mongoose.Model; // true
console.log(`Object.getPrototypeOf(MyModel) === mongoose.Model ${condition}`);
