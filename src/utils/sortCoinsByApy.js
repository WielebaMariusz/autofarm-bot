function sortCoinsByApy(coins) {
  return coins
    .map(coin => ({
      name: coin.wantName.replace(/\s/g, '-'),
      apy: coin.APY_total,
      bscAddress: coin.wantToken0Address,
      price: coin.wantPrice,
      display: coin.display
    }))
    .sort((a, b) => (parseFloat(a.apy) > parseFloat(b.apy) ? 1 : -1))
    .map((c, index) => ({ index, ...c }));
}

module.exports = sortCoinsByApy;
