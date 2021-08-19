const mongoose = require("mongoose");
const { Schema, Types, model, ObjectId, Query } = mongoose;
const {
  connectToDB,
} = require("../01-getting-started/1.2-connecting-to-mongodb");

const express = require("express");
const handleUpgrade = require("./websocket");

/*
module.exports = (app, port) => {
  app.set("query parser", "simple");
  app.use(express.json());
  app.post("/login", require("./login"));
  app.post("/register", require("./register"));

  // The rest of the functionality requires being logged in.
  app.use(require("./checkAuth"));
  app.put("/user", require("./updateUser"));
  app.get("/messages", require("./messages"));

  // Error handling middleware
  app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
  });

  const server = app.listen(port);
  server.on("upgrade", handleUpgrade);
  return server;
};
*/

/*
module.exports = function handleUpgrade(request, socket, head) {
  const header = request.headers["sec-websocket-protocol"];
  const token = header == null ? null : header.slice("access_token, ".length);
  Promise.resolve()
    .then(() => jsonwebtoken.verify(token, secretToken))
    .then((data) => User.findOne({ _id: data.userId }).orFail())
    .then((user) => {
      request.user = user;
      server.handleUpgrade(request, socket, head, (socket) =>
        server.emit("connection", socket, request)
      );
    })
    .catch(() => socket.destroy());
};

*/

/*
server.on("connection", (socket, req) => {
  const { user } = req;
  const userName = user.name;
  socket.on("message", (msg) => {
    Promise.resolve()
      .then(() => JSON.parse(msg))
      .then((msg) => Message.create({ ...msg, user, userName }))
      .then((doc) => server.clients.forEach((c) => sendSuccess(c, doc)))
      .catch((err) => sendError(socket, err.message));
  });
  function sendError(socket, message) {
    socket.send(JSON.stringify({ error: true, message }));
  }
  function sendSuccess(socket, res) {
    socket.send(JSON.stringify({ error: false, res }));
  }
});
*/

/*
const mongoose = require("mongoose");
require("./connect");
const schema = mongoose.Schema(
  {
    user: { type: "ObjectId", required: true, ref: "User" },
    userName: { type: String, required: true, trim: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);
schema.index({ createdAt: -1 });
module.exports = mongoose.model("Message", schema);
*/

module.exports = function messages(req, res, next) {
  Message.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .then((messages) => res.json({ messages }))
    .catch(next);
};
