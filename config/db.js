const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const mongoose = require("mongoose");
const url = process.env.UrlDB;
function DbConnect() {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection.once(
    "open",
    () => {
      console.log("DB connected");
    },
    (err) => {
      console.log("error connection");
    }
  );
}

module.exports = DbConnect;
