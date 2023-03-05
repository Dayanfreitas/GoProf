const { Model } = require('objection');

const host = process.env.DATABASE_HOST
const port = process.env.DATABASE_PORT
const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const database = process.env.DATABASE_NAME

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : host,
      port : port,
      user : user,
      password : password,
      database : database
    }
});
Model.knex(knex)

module.exports = knex;