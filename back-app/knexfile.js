require('dotenv').config();

const host = process.env.DATABASE_HOST
const port = process.env.DATABASE_PORT
const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const database = process.env.DATABASE_NAME

const development = {
    client: 'mysql2',
    connection: {
        host,
        port,
        user,
        password,
        database
    },
    migrations :{
        directory: './src/database/migrations'
      },
    seeds: {
        directory: './src/database/seeds'
    },
    useNullAsDefault: true
}

const production = {
    client: 'mysql2',
    connection: {
        host,
        port,
        user,
        password,
        database
    },
    migrations :{
        directory: './src/database/migrations'
      },
    seeds: {
        directory: './src/database/seeds'
    },
    useNullAsDefault: true
}

const knexfile = {
    development,
    production
}

module.exports = knexfile