const LiveRatesService = require('../services/live_rates_service');
const RatesDataAccess = require('../services/rates_data_access');

class SaveRatesHandler {
  constructor() {
    this.liveRatesService = new LiveRatesService();
    this.ratesDataAccess = new RatesDataAccess();
  }

  async handle(req, res) {
    console.debug('Saving live rates to DB...');

    const rates = await this.liveRatesService.getRates();
    await this.ratesDataAccess.saveRates(rates);

    if (res)
      res.send(rates);
  }
}

module.exports = SaveRatesHandler;