const { Model } = require('objection');
const knex = require('knex');
const configuration = require('../../knexfile'); 

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development
const database = knex(config)
Model.knex(config)

module.exports = database;