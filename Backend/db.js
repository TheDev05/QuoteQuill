const mongoose = require("mongoose");

const URL =
  "mongodb+srv://TheDev05:TheDev05@cluster0.pclim9q.mongodb.net/GoFood?retryWrites=true&w=majority";

async function database() {
  try {
    await mongoose.connect(URL);
    console.log("DataBase connect");
  } catch (err) {
    console.log(err);
  }
}

module.exports = database;
