const HistoricalRatesService = require('../services/historical_rates_service');

class GetLatestRatesHandler {
  constructor(){
    this.historicalRatesService = new HistoricalRatesService();
  }

  async handle(req, res) {
    const rates = await this.historicalRatesService.getLatestAvgRates();
    res.send(rates);
  }
}

module.exports = GetLatestRatesHandler;