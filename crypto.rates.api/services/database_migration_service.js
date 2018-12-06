const _ = require('underscore');
const Knex = require('knex');
const config = require('../config.json');

class DatabaseMigrationService {
  static async up() {

    const knexOptions = {
      client: 'mysql',
      connection: config.database,
    };

    try {
      const result = await Knex(knexOptions).migrate.latest();

      const fileNames = result[1];
      if (fileNames.length > 0) {
        _.each(fileNames, fileName => console.log(`Database updated: ${fileName}`));
      }
    }
    catch(error) {
      console.error(`Error updating database: ${error}`);
      throw(error);
    }
  }
}

module.exports = DatabaseMigrationService;