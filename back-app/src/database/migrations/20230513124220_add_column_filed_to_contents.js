exports.up = function (knex) {
  return knex.schema.alterTable("contents", function (table) {
    table.boolean("filed").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("contents", function (table) {
    table.dropColumn("filed");
  });
};
