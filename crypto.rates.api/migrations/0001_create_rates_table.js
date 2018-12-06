exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('rates', function (t) {
      t.increments('id').notNullable().primary();
      t.string('provider', 50).notNullable();
      t.string('instrument', 50).notNullable();
      t.float('rate').notNullable();
      t.dateTime('time').notNullable();
    })
  ]);
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('rates');
};
