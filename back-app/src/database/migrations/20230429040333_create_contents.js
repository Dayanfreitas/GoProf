exports.up = function(knex) {
  return knex.schema.createTable('contents', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('summary').notNullable()
    table.text('description')
    table.string('image_path')
    table.string('video_path')
  })
}

exports.down = function(knex) {
  knex.schema.dropTable('contents')
}

