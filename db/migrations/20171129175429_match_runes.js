exports.up = function(knex, Promise) {
  return knex.schema.createTable('match_runes', table => {
    table.increments('id');
    table.integer('summoner_id').unsigned();
    table.foreign('summoner_id').references('summoners.summoner_id');
    table.integer('match_id').unsigned();
    table.foreign('match_id').references('matches.match_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.raw('drop table match_items cascade');
};
