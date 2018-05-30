require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

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

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
