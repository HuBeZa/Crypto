const _ = require('underscore');
const DatabaseMigrationService = require('./database_migration_service');
const JobScheduler = require('./job_scheduler');
const ApiServerHost = require('./api_server_host');

class Bootstrap {
  static getAvailableCommands() {
    const commands = Object.getOwnPropertyNames(Bootstrap.prototype);
    return _.without(commands, 'constructor');
  }

  async migrate() {
    await DatabaseMigrationService.up();

    console.info('Migration finished');
  }

  scheduler() {
    const jobScheduler = new JobScheduler();
    jobScheduler.start();

    console.info('Job scheduler is up and running');
  }

  api() {
    const apiServerHost = new ApiServerHost();
    apiServerHost.start();

    console.info('API server is up and running');
  }
}

module.exports = Bootstrap;