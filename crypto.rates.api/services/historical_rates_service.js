const _ = require('underscore');
const RatesDataAccess = require('./rates_data_access');

class HistoricalRatesService {
  constructor() {
    this.ratesDataAccess = new RatesDataAccess();
  }

  async getLatestAvgRates() {
    const latestRates = await this.ratesDataAccess.getHistoricalRates(1);

    const ratesByInstrument = _.groupBy(latestRates, 'instrument');
    const averageRates = _.map(ratesByInstrument, (rates, instrument) => {
      return {
        instrument: instrument,
        rate: _.reduce(rates, (memo, rate) => memo + rate.rate, 0) / rates.length
      };
    });

    return _.sortBy(averageRates, 'instrument');
  }

  async getHistory(depth) {
    const latestRates = await this.ratesDataAccess.getHistoricalRates(depth);
    return _.chain(latestRates).sortBy('time').reverse().value();
  }
}

module.exports = HistoricalRatesService;