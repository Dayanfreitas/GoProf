exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').unique().notNullable();
    table.string('token_sub_google').unique();
    table.string('image_path');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};