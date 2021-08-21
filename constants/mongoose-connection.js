// https://docs.mongodb.com/drivers/node/current/fundamentals/connection/
// https://docs.mongodb.com/manual/reference/connection-string/

require("dotenv").config({ path: "../.env" });
const { env } = process;
// "mongodb://localhost:27017/mydb"
const uri = `${env.PROTOCOL}://${env.HOST}:${env.PORT}/${env.DATABASE_NAME}`;

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 10, // default for MongoDB node.js driver
};

module.exports = { uri, connectionOptions };
