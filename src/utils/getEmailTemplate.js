const getEmailTemplate = (coins, coinsAmount) => {
  return `
    <div style="margin-bottom: 10px;">
      <p>All coins listed on Autofarm: ${coinsAmount}</p>
      ${coins.reduce((acc, { name, apy, price, bscAddress, display, index }) => {
        return (acc += `<div style="padding-bottom: 0; padding-top: 10px;">Coin: <b>${name}</b></div>
                <ul style="list-style-type:none; padding: 0; margin: 0; font-family:monospace;">
                  <li>apy rank: ${index + 1}/${coinsAmount}</li>
                  <li>apy: ${(apy * 100).toFixed(2)}</li>
                  <li>price: ${price}</li>
                  <li>BSC address: <a href="https://bscscan.com/address/${bscAddress}">${bscAddress}</a></li>
                  <li>poocoin price: <a href="https://poocoin.app/tokens/${bscAddress}">link</a></li>
                  <li>display: ${display}</li>
                </ul>`);
      }, '')}
    </div>
  `;
};

module.exports = getEmailTemplate;
