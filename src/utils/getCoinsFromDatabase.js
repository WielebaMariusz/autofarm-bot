const Coins = require('../models/coins');

async function getCoinsFromDatabase() {
  return await Coins.find().sort({ createdAt: -1 }).limit(1);
}

module.exports = getCoinsFromDatabase;
