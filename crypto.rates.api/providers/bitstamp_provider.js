const rp = require('request-promise');
const ProviderBase = require('./provider_base');

class BitstampProvider extends ProviderBase {
  constructor(){
    super('Bitstamp');
  }

  async getMidRate(pair) {
    try {
      const pairName = (pair[0] + pair[1]).toLowerCase();

      const request = {
        uri: `https://www.bitstamp.net/api/v2/ticker/${pairName}/`,
        json: true
      };
      const response = await rp(request);

      const ask = parseFloat(response.ask);
      const bid = parseFloat(response.bid);
      return (ask + bid) / 2;
    }
    catch(error) {
      console.error(`Fail to get rates from ${this.name}. Pair=${pair}, Code=${error.statusCode}`);
      return undefined;
    }
  }
}

module.exports = BitstampProvider;