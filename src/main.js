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
require('dotenv').config();

async function main() {
  try {
    console.log('🚗 Autofarm bot started');

    await setupMongooseDB();
    console.log('🟢 database connected successfully');

    const coinsFromAutofarm = await getCoinsFromAutofarm();
    console.log('🟢 got Autofarm coins successfully');
    const autofarmSortedCoins = sortCoinsByApy(coinsFromAutofarm);
    const AutofarmCoinsNames = mapCoinsName(autofarmSortedCoins);

    const coinsFromDB = await getCoinsFromDatabase();
    console.log('🟢 got DB coins successfully');
    const [coins] = coinsFromDB;
    const DBCoinsNames = mapCoinsName(coins.coins);

    const foo = [
      'BUSD-TXL-LP',
      'BUSD-FOR-LP',
      'BUSD-NULS-LP',
      'BUSD-RAMP-LP',
      'BUSD-DEXE-LP',
      'BUSD-TPT-LP',
      'BUSD-XMARK-LP',
      'BUSD-IOTX-LP',
      'WBNB-DEGO-LP',
      'WBNB-GUM-LP',
      'WBNB-PBTC-LP',
      'WBNB-DFT-LP',
      'WBNB-SWTH-LP',
      'WBNB-LIEN-LP',
      'WBNB-ZIL-LP',
      'WBNB-pCWS-LP',
      'WBNB-LTO-LP',
      'WBNB-TRADE-LP',
      'WBNB-DUSK-LP',
      'WBNB-COS-LP',
      'WBNB-ALICE-LP',
      'WBNB-BUX-LP',
      'WBNB-BEL-LP',
      'WBNB-WATCH-LP',
      'WBNB-BMXX-LP',
      'WBNB-BOR-LP',
      'WBNB-BELT-LP-(PCSv1)',
      'WBNB-bOPEN-LP',
      'WBNB-DODO-LP'
    ];

    const bar = [
      'BUSD-TXL-LP',
      'BUSD-FOR-LP',
      'BUSD-NULS-LP',
      'BUSD-RAMP-LP',
      'BUSD-DEXE-LP',
      'BUSD-TPT-LP',
      'BUSD-XMARK-LP',
      'BUSD-IOTX-LP',
      'WBNB-DEGO-LP',
      'WBNB-GUM-LP',
      'WBNB-PBTC-LP',
      'WBNB-DFT-LP',
      'WBNB-SWTH-LP',
      'WBNB-LIEN-LP',
      'WBNB-ZIL-LP',
      'WBNB-pCWS-LP',
      'WBNB-LTO-LP',
      'WBNB-TRADE-LP',
      'WBNB-DUSK-LP',
      'WBNB-COS-LP',
      'WBNB-ALICE-LP',
      'WBNB-BUX-LP',
      'WBNB-BEL-LP',
      'WBNB-WATCH-LP',
      'WBNB-BMXX-LP'
    ];
    // const differentCoins = getDifference(AutofarmCoinsNames, DBCoinsNames);
    const differentCoins = getDifference(foo, bar);

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
