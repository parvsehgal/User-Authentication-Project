const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connection is sucessfull");
    })
    .catch(() => {
      console.log("error");
    });
};
module.exports = dbConnect;
