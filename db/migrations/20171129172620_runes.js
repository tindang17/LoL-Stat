exports.up = function(knex, Promise) {
  return knex.schema.createTable('runes', table => {
    table.increments('id');
    table.string('name');
    table.integer('rune_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table runes cascade');
};
