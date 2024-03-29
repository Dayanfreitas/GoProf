exports.up = function(knex) {
  return knex.schema.createTable('reports', table => {
    table.increments('id').primary()
    table.string('type_report').notNullable()
    table.integer('content_id').unsigned();
    table.foreign('content_id').references("contents.id");
    table.integer('user_id').unsigned();
    table.foreign('user_id').references("users.id");
  })
}

exports.down = function(knex) {
  knex.schema.dropTable('reports')
}

