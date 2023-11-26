const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const dbConnect = require("./config/databse");

const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("server instantiated");
});

dbConnect();
