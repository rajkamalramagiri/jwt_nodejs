const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const db = require("./model/db.js");

const authRoute = require("./routes/auth");
const posts = require("./routes/post");

app.use(express.json());
app.use("/post", posts);

app.use("/api/user", authRoute);
app.listen(3001, () => {
  console.log("listening to 3001");
});
