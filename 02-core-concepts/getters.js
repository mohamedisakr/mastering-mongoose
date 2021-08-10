const mongoose = require("mongoose");
const { Schema, SchemaType, model } = mongoose;

const schema = new Schema({ email: String });
const Model = model("User", schema);

// `v` is the underlying value stored in the database
schema.path("email").get((v) => v.replace("@", " [at] "));
const doc = new Model({ email: "test@gmail.com" });

console.log(doc.email); // 'test [at] gmail.com'
console.log(doc.get("email")); // 'test [at] gmail.com'
