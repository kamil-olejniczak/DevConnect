require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbURI = require("./config/keys").mongoURI();
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(error => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
