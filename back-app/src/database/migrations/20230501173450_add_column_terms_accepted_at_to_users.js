const { knex } = require("../database");

exports.up = function(knex) {
  return knex.schema.alterTable('users', function(table) {
    table.date('terms_accepted_at').defaultTo();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', function(table) {
    table.dropColumn('terms_accepted_at');
  });
};