const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId } = mongoose;
const assert = require("assert/strict");

/*
const str = "5d124083fc741d44eca250fd";
const schema = Schema({ objectid: ObjectId });
const Model = model("ObjectIdTest", schema);

const doc1 = new Model({ objectid: str });
const doc2 = new Model({ objectid: str });

// Mongoose casted the string `str` to an ObjectId
console.log(`typeof doc1.objectid : ${typeof doc1.objectid}`); // 'object'

let condition = doc1.objectid instanceof Types.ObjectId; // true
console.log(`doc1.objectid instanceof Types.ObjectId : ${condition}`);

condition = doc1.objectid === doc2.objectid; // false
console.log(`doc1.objectid === doc2.objectid : ${condition}`);

condition = doc1.objectid == doc2.objectid; // false
console.log(`doc1.objectid == doc2.objectid : ${condition}`);

condition = doc1.objectid.toString() == doc2.objectid.toString(); // true
console.log(
  `doc1.objectid.toString() == doc2.objectid.toString() : ${condition}`
);
// */

// -------------------

/*
const str = "5d124083fc741d44eca250fd";
const s = Schema({ objectid: ObjectId }, { _id: false });

// Add a custom getter that converts ObjectId values to strings
s.path("objectid").get((v) => v.toString());
const Model = model("ObjectIdTest", s);

const doc1 = new Model({ objectid: str });
const doc2 = new Model({ objectid: str });

// Mongoose now converts `objectid` to a string for you
console.log(`typeof doc1.objectid : ${typeof doc1.objectid}`); // 'string'

// The raw value stored in MongoDB is still an ObjectId
let theType = typeof doc1.get("objectid", null, { getters: false }); // 'object'
console.log(
  `typeof doc1.get("objectid", null, { getters: false }) : ${theType}`
);

let condition = doc1.objectid === doc2.objectid; // true
console.log(`doc1.objectid === doc2.objectid : ${condition}`);

condition = doc1.objectid == doc2.objectid; // true
console.log(`doc1.objectid == doc2.objectid : ${condition}`);

assert.deepEqual(doc1.toObject(), doc2.toObject()); // passes
// */

/*
const accountSchema = Schema({ balance: mongoose.Decimal128 });
const Account = model("Account", accountSchema);

await Account.create({ balance: 0.1 });
await Account.updateOne({}, { $inc: { balance: 0.2 } });

const account = await Account.findOne();
account.balance.toString(); // 0.3
// The MongoDB Node driver currently doesn't support
// addition and subtraction with Decimals
account.balance + 0.5;
*/

/*
const accountSchema = Schema({
  balance: {
    type: mongoose.Decimal128,
    // Convert the raw decimal value to a native JS number
    // when accessing the `balance` property
    get: (v) => parseFloat(v.toString()),
    // When setting the `balance` property, round to 2
    // decimal places and convert to a MongoDB decimal
    set: (v) => mongoose.Types.Decimal128.fromString(v.toFixed(2)),
  },
});

const Account = model("Account", accountSchema);
const account = new Account({ balance: 0.1 });
account.balance += 0.2;
console.log(account.balance); // 0.3
*/
