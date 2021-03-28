/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

const path = require("path");

const {
  DATABASE_URL = "postgres://qewhvmpo:ZuJfIXvV_DwdZIYZiMUkTAxuuhrKE7Oi@queenie.db.elephantsql.com:5432/qewhvmpo",
  DATABASE_URL_DEVELOPMENT = "postgres://pvhqtixi:Jk6JsoCuyIzD4-gMNOQr3c6-_c3XhTUL@queenie.db.elephantsql.com:5432/pvhqtixi",
  DATABASE_URL_TEST = "postgres://yzubfxmu:bX7V0U9c5l0CtVuh3Ofz3LgqM2mv9Zzz@queenie.db.elephantsql.com:5432/yzubfxmu",
  DATABASE_URL_PREVIEW = "postgres://lrsvemqi:LAIxivtEcF0PLgX9iMhRi88-ZklUjLRC@queenie.db.elephantsql.com:5432/lrsvemqi",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
