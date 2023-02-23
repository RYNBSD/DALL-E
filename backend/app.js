const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const conn = require("./models/conn");

const postRoutes = require("./routes/post");
const dalleRoutes = require("./routes/dalle");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("*", (req, res) => {
  return res.status(404).json({ message: "Not found" });
})

try {
  conn(`${process.env.MONGODB_URL}`);
}
catch (e) {
  console.error(e.message);
}

module.exports = app;
