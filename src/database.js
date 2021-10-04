const mongoose = require("mongoose");

function connectToDatabase() {
  mongoose.connect(
    "mongodb+srv://obamis:12345@cluster0.wnkb1.mongodb.net/integration?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("📦 Connected to the database"));
}

module.exports = connectToDatabase;
