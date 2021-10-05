require("dotenv").config();
const mongoose = require("mongoose");

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

function connectToDatabase() {
  mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.wnkb1.mongodb.net/integration?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("📦 Connected to the database"));
}

module.exports = connectToDatabase;
