// Update with your config settings.

require('dotenv').config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/db.sqlite3"
    },
    useNullAsDefault: true,

    migrations: { directory: "./data/migrations" },

    seeds: { directory: "./data/seeds" }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/db.sqlite3"
    },
    useNullAsDefault: true,

    migrations: { directory: "./data/migrations" },

    seeds: { directory: "./data/seeds" }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  }
};