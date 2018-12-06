const rp = require('request-promise');
const ProviderBase = require('./provider_base');
const config = require('../config.json');

class CryptoCompareProvider extends ProviderBase {
  constructor(){
    super('CryptoCompare');
  }

  async getMidRate(pair) {
    try {
      const request = {
        uri: 'https://min-api.cryptocompare.com/data/price',
        qs: {
          fsym: pair[0].toUpperCase(),
          tsyms: pair[1].toUpperCase(),
          api_key: config.providers.cryptocompare.api_key
        },
        json: true
      };
      const response = await rp(request);

      if (response.Response) {
        console.error(`Fail to get rates from ${this.name}. Pair=${pair}, Response=${JSON.stringify(response)}`);
        return undefined;
      }

      return response[pair[1]];
    }
    catch(error) {
      console.error(`Fail to get rates from ${this.name}. Pair=${pair}, Code=${error.statusCode}`);
      return undefined;
    }
  }
}

module.exports = CryptoCompareProvider;