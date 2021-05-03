const axios = require('axios');

async function getCoins() {
  try {
    const response = await axios.get(
      `https://static.autofarm.network/bsc/farm_data.json?timestamp=${new Date().getTime()}`
    );
    return Object.values(response.data.pools);
  } catch (error) {
    return error;
  }
}

module.exports = getCoins;
