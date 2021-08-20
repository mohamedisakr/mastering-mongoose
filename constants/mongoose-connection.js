const uri = "mongodb://localhost:27017/mydb";

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 10, // Maintain up to 10 socket connections
};

module.exports = { uri, connectionOptions };
