const _ = require('underscore');
const mySql = require('promise-mysql');
const config = require('../config.json');

class RatesDataAccess {
  constructor() {
    const dbConfig = Object.assign({timezone: 'Z'}, config.database);
    this.connectionPool = mySql.createPool(dbConfig);
  }

  async saveRates(rates) {
    const connection = await this.connectionPool.getConnection();

    try {
      await connection.beginTransaction();

      const queries = _.map(rates, rate => connection.query('INSERT INTO rates SET ?', rate));
      await Promise.all(queries);

      await connection.commit();
      console.debug(`${rates.length} rates saved`);
    }
    catch (error) {
      console.error(`Saving rates to DB failed: ${error}`);
      await connection.rollback();
    }
    finally {
      this.connectionPool.releaseConnection(connection);
    }
  }

  /*
  * Get the latest n rates for each provider's instrument
  */
  async getHistoricalRates(depth) {
    return await this.connectionPool.query(
      `WITH ranked_rates AS (
        SELECT r.*, ROW_NUMBER() OVER (PARTITION BY r.provider, r.instrument ORDER BY time DESC) AS time_rank
        FROM rates as r
      )
      SELECT provider, instrument, rate, time
      FROM ranked_rates
      WHERE time_rank <= ?`, depth);
  }
}

module.exports = RatesDataAccess;