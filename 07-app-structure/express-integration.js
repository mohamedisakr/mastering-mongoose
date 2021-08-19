const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

/*
const crypto = require("crypto");
const mongoose = require("mongoose");
const { Schema } = mongoose;

require("./connect");

let Model = mongoose.model(
  "AccessToken",
  Schema({
    _id: {
      type: String,
      required: true,
      default: () => crypto.randomBytes(50).toString("base64"),
    },
    user: { type: "ObjectId", ref: "User", required: true },
  })
);
module.exports = Model;
*/

/*
const AccessToken = require("../models/AccessToken");
const User = require("../models/User");
module.exports = function checkAuth(req, res, next) {
  AccessToken.findOne({ _id: req.headers.authorization })
    .orFail()
    .then(({ user }) => User.findOne({ _id: user }).orFail())
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(next);
};
*/

/*
const app = require("express")();

// Ensure that `req.query` values are always strings or nullish
app.set("query parser", "simple");
app.use(express.json());
app.post("/login", require("./login"));
app.post("/register", require("./register"));

// The rest of the functionality requires being logged in.
app.use(require("./checkAuth"));
app.put("/user", require("./updateUser"));
app.get("/users", require("./findUsers"));

// Error handling middleware
app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
});

module.exports = app;
*/

/*
const AccessToken = require("../models/AccessToken");
const AuthenticationMethod = require("../models/AuthenticationMethod");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = function handleLogin(req, res, next) {
  const { email, password } = req.body;
  let user;
  User.findOne({ email })
    .orFail()
    .then(({ _id }) => {
      user = _id;
      return AuthenticationMethod.findOne({ user }).orFail();
    })
    .then(({ secret }) => bcrypt.compare(password, secret))
    .then((success) => {
      if (!success) return next(Error("Incorrect Password"));
      return AccessToken.create({ user });
    })
    .then(({ _id }) => res.json({ token: _id }))
    .catch(next);
};
*/

/*
const AuthenticationMethod = require("../models/AuthenticationMethod");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
module.exports = function register(req, res, next) {
  User.create(req.body)
    .then((user) => {
      return bcrypt
        .hash(req.body.password, 4)
        .then((secret) => AuthenticationMethod.create({ user, secret }))
        .then(() => user);
    })
    .then((user) => res.json(user))
    .catch(next);
};
*/

/*
module.exports = function updateUser(req, res, next) {
  req.user.set(req.body);
  req.user
    .save()
    .then(() => res.json(req.user))
    .catch(next);
};
*/

const urlRoot = "http://localhost:3000";

const user = {
  firstName: "Taco",
  lastName: "MacArthur",
  email: "taco@theleague.com",
  password: "taco",
};

let res = await axios.post(`${urlRoot}/register`, user);
assert.equal(res.data.firstName, "Taco");
assert.strictEqual(res.data.password, undefined);

const count = await mongoose.model("AuthenticationMethod").countDocuments({});

assert.equal(count, 1);
res = await axios.post(`${urlRoot}/login`, user);
assert.ok(res.data.token);
