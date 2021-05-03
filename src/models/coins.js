const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema(
  {
    coins: {
      type: Array,
      required: true
    },
    coinsNames: {
      type: Array,
      required: true
    },
    coinsAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Coins = mongoose.model('coin', coinSchema);

module.exports = Coins;
