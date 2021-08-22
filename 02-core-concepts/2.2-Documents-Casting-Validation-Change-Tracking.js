const mongoose = require("mongoose");

const MyModel = mongoose.model("MyModel", new mongoose.Schema({}));
// `MyModel` is a class that extends from `mongoose.Model`, _not_
// an instance of `mongoose.Model`.
let condition = MyModel instanceof mongoose.Model; // false
console.log(`MyModel instanceof mongoose.Model ${condition}`);
condition = Object.getPrototypeOf(MyModel) === mongoose.Model; // true
console.log(`Object.getPrototypeOf(MyModel) === mongoose.Model ${condition}`);

//=============================================

const productSchema = new Schema({ name: String, price: Number });
const Product = model("product", productSchema);

//================================================

const connection = mongoose.createConnection(uri, connectionOptions);
const productSchema = new Schema({ name: String, price: Number });
const Product = connection.model("product", productSchema);

//===========================================

// `mongoose.model()` uses the default connection
mongoose.model("product", productSchema);

// So the below function call does the same thing
mongoose.connection.model("product", productSchema);

//========================================

const Product = connection.model("product", productSchema);

// `MyModel` is a class that extends from `mongoose.Model`, _not_
// an instance of `mongoose.Model`.
let condition = Product instanceof mongoose.Model;
console.log(`Product instanceof mongoose.Model ${condition}`); // false

condition = Object.getPrototypeOf(Product) === mongoose.Model; // true
console.log(`Object.getPrototypeOf(Product) === mongoose.Model ${condition}`); // true
