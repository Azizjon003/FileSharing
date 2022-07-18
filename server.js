const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");

const app = express();
const Port = process.env.PORT || 8000;
const DbConnect = require("./config/db");
DbConnect();
const route = require("./routes/files");
app.use("/api/", route);
app.listen(Port, () => {
  console.log(`listen to port ${Port}`);
});
