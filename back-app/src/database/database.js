const { Model } = require('objection');
const knex = require('knex');
const knexfile = require('../../knexfile'); 

const configuration = process.env.NODE_ENV === 'test' ? knexfile.test : knexfile.development

Model.knex(
  knex(configuration)
)

class ModelBase extends Model {

}

module.exports = ModelBase