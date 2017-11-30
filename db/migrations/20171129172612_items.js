exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', table => {
    table.increments('id');
    table.string('item');
    table.integer('item_id');

  })
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table items cascade');
};