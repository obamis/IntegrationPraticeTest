const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  order_date: {
    type: String,
    require: true,
  },

  amount: {
    type: String,
    require: true,
  },
  orders_dayly_quantity: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Balance", BalanceSchema);
