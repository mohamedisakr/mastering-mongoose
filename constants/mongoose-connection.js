// https://docs.mongodb.com/drivers/node/current/fundamentals/connection/
// https://docs.mongodb.com/manual/reference/connection-string/

require("dotenv").config({ path: "../.env" });

const uri = `${process.env.PROTOCOL}${process.env.HOST}${process.env.PORT}${process.env.DATABASE_NAME}`; //"mongodb://localhost:27017/mydb";

// console.log(`Connection string : ${uri}`);

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 10, // default for node.js MongoDB driver
};

module.exports = { uri, connectionOptions };
