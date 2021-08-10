const mongoose = require("mongoose");
const { Schema, SchemaType, model } = mongoose;

const userSchema = Schema({ email: String });
userSchema.path("email").set((v) => v.toLowerCase());
const User = model("User", userSchema);

const user = new User({ email: "TEST@gmail.com" });
console.log(user.email); // 'test@gmail.com'
