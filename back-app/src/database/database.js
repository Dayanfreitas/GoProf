const { Model } = require("objection");
const knex = require("knex");
const knexfile = require("../../knexfile");

let configuration = knexfile.production;

Model.knex(knex(configuration));

class ModelBase extends Model {}

module.exports = ModelBase;
