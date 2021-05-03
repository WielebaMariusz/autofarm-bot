const Coins = require('../models/coins');

async function addCoinsToDB({ coins, coinsAmount, coinsNames }) {
  const newCoins = new Coins({
    coins,
    coinsNames,
    coinsAmount
  });
  return await newCoins.save();
}

module.exports = addCoinsToDB;
