const BitstampProvider = require('../providers/bitstamp_provider');
const CryptCompareProvider = require('../providers/cryptocompare_provider');
const config = require('../config.json');

class LiveRatesService {
  constructor(){
    this.providers = [
      new BitstampProvider(),
      new CryptCompareProvider(),
    ];
  }

  async getRates() {
    const results = [];

    for (const provider of this.providers) {
      for (const pair of config.pairs) {
        const rate = await provider.getMidRate(pair);
        const pairName = pair[0] + pair[1];

        results.push({
          provider: provider.name,
          instrument: pairName,
          rate: rate,
          time: new Date()
        });
      }
    }

    return results;
  }
}

module.exports = LiveRatesService;