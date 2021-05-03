function getExtendedCoins(differentCoins, autofarmCoins) {
  return autofarmCoins.filter(coin => differentCoins.includes(coin.name));
}

module.exports = getExtendedCoins;
