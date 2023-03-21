require('dotenv').config();

const { env } = process;

{
  development = {
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
};

module.exports = development;