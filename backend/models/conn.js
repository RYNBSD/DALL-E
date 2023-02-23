const mongoose = require('mongoose');

const conn = async (url) => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(url)
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.error(err.message));
}

module.exports = conn;