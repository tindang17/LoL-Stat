exports.up = function(knex, Promise) {
  return knex.schema.createTable('champions', table => {
    table.increments('id');
    table.string('name');
    table.integer('champion_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table champions cascade');
};
