const Express = require('express');
const SaveRatesHandler = require('../handlers/save_rates_handler');
const GetLatestRatesHandler = require('../handlers/get_latest_rates_handler');
const GetRatesHistoryHandler = require('../handlers/get_rates_history_handler');
const config = require('../config.json');

class ApiServerHost {
  constructor() {
    this.listeningPort = config.port;
    this.restServer = Express();
    this.saveRatesHandler = new SaveRatesHandler();
    this.getLatestRatesHandler = new GetLatestRatesHandler();
    this.getRatesHistoryHandler = new GetRatesHistoryHandler();
  }

  start() {
    this.restServer.get('/Rates/Save', (req, res) => this.saveRatesHandler.handle(req, res));
    this.restServer.get('/Rates/Last', (req, res) => this.getLatestRatesHandler.handle(req, res));
    this.restServer.get('/Rates/History', (req, res) => this.getRatesHistoryHandler.handle(req, res));

    this.restServer.listen(this.listeningPort, () => console.log(`Live Rates API Server is listening on port ${this.listeningPort}!`))
      .on('error', error => {
        console.error(`Fail to start listening on port ${this.listeningPort}: ${error}`);
        throw(error);
      });
  }
}

module.exports = ApiServerHost;