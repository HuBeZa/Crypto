const CronJob = require('cron').CronJob;
const SaveRatesHandler = require('../handlers/save_rates_handler');
const config = require('../config.json');

class JobScheduler {
  constructor() {
    this.saveRatesCron = config.save_rates_cron;
    this.saveRatesHandler = new SaveRatesHandler();
  }

  start() {
    new CronJob(this.saveRatesCron, () => this.saveRatesHandler.handle(), null, true);
  }
}

module.exports = JobScheduler;