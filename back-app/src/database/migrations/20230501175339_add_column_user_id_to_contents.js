exports.up = function(knex) {
  return knex.schema.alterTable('contents', function(table) {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references("users.id");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('contents', function(table) {
    table.dropForeign('user_id')
    table.setNullable('user_id');
    table.dropColumn('user_id');
  });
};