const HistoricalRatesService = require('../services/historical_rates_service');

class GetRatesHistoryHandler {
  constructor() {
    this.historicalRatesService = new HistoricalRatesService();
  }

  async handle(req, res) {
    const rates = await this.historicalRatesService.getHistory(20);
    res.send(rates);
  }
}

module.exports = GetRatesHistoryHandler;