const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  order_date: {
    type: Date,
    require: true,
  },

  amount: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Balance", BalanceSchema);
