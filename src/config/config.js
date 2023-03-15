require('dotenv').config();

const { env } = process;

const development = {
  username: env.DB_USER,
  password: env.DB_PWD,
  database: env.DB_NAME,
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
};

module.exports = development;