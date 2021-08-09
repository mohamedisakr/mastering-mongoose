const mongoose = require("mongoose");
const { Schema, SchemaType, model } = mongoose;

const schema = Schema({ name: String, age: Number });

console.log(Object.keys(schema.paths)); // ['name', 'age', '_id']

console.log(schema.path("name")); // SchemaString { path: 'name', ... }
let condition = schema.path("name") instanceof SchemaType; // true
console.log(`schema.path("name") instanceof SchemaType is ${condition}`);

// The `SchemaString` class inherits from `SchemaType`.
condition = schema.path("name") instanceof Schema.Types.String; // true
console.log(
  `schema.path("name") instanceof Schema.Types.String is ${condition}`
);

console.log(schema.path("age")); // SchemaNumber { path: 'age', ... }
condition = schema.path("age") instanceof SchemaType; // true
console.log(`schema.path("age") instanceof SchemaType is ${condition}`);

condition = schema.path("age") instanceof Schema.Types.Number; // true
console.log(
  `schema.path("age") instanceof Schema.Types.Number is ${condition}`
);
