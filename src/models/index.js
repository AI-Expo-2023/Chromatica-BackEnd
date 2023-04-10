const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js");
const db = {};

const sequelize = new Sequelize({ ...config, sync: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Design = require('./design')(sequelize, Sequelize);
db.Photo = require('./photo.js')(sequelize, Sequelize)

db.User.hasOne(db.Design, { foreignKey: 'userID', sourceKey: 'userID' })
db.Design.belongsTo(db.User, { foreignKey : 'userID', targetKey : 'userID'})

db.User.hasMany(db.Photo, { foreignKey: 'userID', sourceKey: 'userID' })
db.Photo.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'userID' })

module.exports = db;