exports.up = function(knex, Promise) {
  return knex.schema.createTable('matches', table => {
      table.increments('id');
      table.integer('match_id');
      table.boolean('win');
      table.integer('kill');
      table.integer('death');
      table.integer('assist');
      table.integer('game_length');
      table.integer('creep_score')
      table.integer('champion_id').unsigned();
      table.foreign('champion_id').references('champions.champion_id');
      table.integer('summoner_id').unsigned();
      table.foreign('summoner_id').references('summoners.summoner_id');
  });
};

exports.down = function(knex, Promise) {
   return knex.raw('drop table matches cascade');
};
