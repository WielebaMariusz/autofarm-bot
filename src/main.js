const mongoose = require('mongoose');
const setupMongooseDB = require('./setupMongooseDB');
const getCoinsFromAutofarm = require('./getCoins');
const getCoinsFromDatabase = require('./utils/getCoinsFromDatabase');
const sortCoinsByApy = require('./utils/sortCoinsByApy');
const getDifference = require('./utils/getDifference');
const addCoinsToDB = require('./utils/addCoinsToDB');
const getExtendedCoins = require('./utils/getExtendedCoins');
const mapCoinsName = require('./utils/mapCoinsName');
const sendEmail = require('./sendEmail');

async function main() {
  try {
    console.log('🚗 Autofarm bot started');

    await setupMongooseDB();
    console.log('🟢 database connected successfully');

    const coinsFromAutofarm = await getCoinsFromAutofarm();
    console.log('🟢 got Autofarm coins successfully');
    const autofarmSortedCoins = sortCoinsByApy(coinsFromAutofarm);
    const AutofarmCoinsNames = mapCoinsName(autofarmSortedCoins);
    console.log('🔎 coins ammount form Autofarm', AutofarmCoinsNames.length);

    const coinsFromDB = await getCoinsFromDatabase();
    console.log('🟢 got DB coins successfully');
    const [coins] = coinsFromDB;
    const DBCoinsNames = mapCoinsName(coins.coins);
    console.log('🔎 coins ammount form database', DBCoinsNames.length);

    const differentCoins = getDifference(AutofarmCoinsNames, DBCoinsNames);

    if (differentCoins.length) {
      const extendedCoins = getExtendedCoins(differentCoins, autofarmSortedCoins);
      await sendEmail(extendedCoins, autofarmSortedCoins.length, extendedCoins.length);
      console.log('🟢 email sent successfully');

      await addCoinsToDB({
        coins: autofarmSortedCoins,
        coinsAmount: autofarmSortedCoins.length,
        coinsNames: AutofarmCoinsNames
      });
      console.log('🟢 coins added to DB successfully');

      return 'Bot found some news';
    }
  } catch (error) {
    console.log('error', error);
    return error;
  } finally {
    await mongoose.disconnect();
    console.log('🟢 database disconnectedd successfully');
  }
}

module.exports = main;
