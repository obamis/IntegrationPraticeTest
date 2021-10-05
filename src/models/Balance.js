const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  idPedido: {
    type: Number,
    required: true,
  },
  order_date: {
    type: Date,
    require: true,
  },

  amount: {
    type: Number,
    require: true,
  },
  orgName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Balance", BalanceSchema);
