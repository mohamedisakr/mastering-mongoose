const mongoose = require("mongoose");
const { Schema } = mongoose;

// Here's how you create a connection:
const conn = mongoose.createConnection();
let condition = conn instanceof mongoose.Connection; // true
console.log(`conn instanceof mongoose.Connection ${condition}`);

// Here's how you create a schema
const schema = new Schema({ name: String });

// Calling `conn.model()` creates a new model. In this book
// a "model" is a class that extends from `mongoose.Model`
const MyModel = conn.model("ModelName", schema);
condition = Object.getPrototypeOf(MyModel) === mongoose.Model; // true
console.log(`Object.getPrototypeOf(MyModel) === mongoose.Model ${condition}`);

// You shouldn't instantiate the `Document` class directly.
// You should use a model instead.
const document = new MyModel();
condition = document instanceof MyModel; // true
let condition2 = document instanceof mongoose.Document; // true
console.log(`document instanceof MyModel ${condition}`);
console.log(`document instanceof mongoose.Document ${condition2}`);

const query = MyModel.find();
condition = query instanceof mongoose.Query; // true
console.log(`query instanceof mongoose.Query ${condition}`);
