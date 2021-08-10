const mongoose = require("mongoose");
const { Schema, SchemaType, model } = mongoose;

const schema = new Schema({ email: String });
const Model = model("User", schema);

// `v` is the underlying value stored in the database
schema.path("email").get((v) => v.replace("@", " [at] "));
const doc = new Model({ email: "test@gmail.com" });

console.log(doc.email); // 'test [at] gmail.com'
console.log(doc.get("email")); // 'test [at] gmail.com'

// Make sure you don't forget to pass `null` as the 2nd parameter.
doc.get("email", null, { getters: false }); // 'test@gmail.com'
