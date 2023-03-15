const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config");
const db = {};

const sequelize = new Sequelize({ ...config, sync: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;