exports.up = function(knex, Promise) {
  return knex.schema.createTable('summoners', table => {
    table.increments('id');
    table.string('name');
    table.integer('summoner_id');
    table.integer('level');
    table.integer('account_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table champions cascade');
};
