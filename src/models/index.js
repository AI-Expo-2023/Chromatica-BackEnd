const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize({ ...config, sync: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Photo = require('./photo.js')(sequelize, Sequelize);
db.Like = require('./like.js')(sequelize, Sequelize);
db.Save = require('./save')(sequelize, Sequelize);
db.Report = require('./report')(sequelize, Sequelize);

db.User.hasMany(db.Photo, { foreignKey: 'userID', sourceKey: 'userID' })
db.Photo.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'userID' })

db.User.hasMany(db.Like, { foreignKey: 'userID', sourceKey: 'userID' })
db.Like.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'userID' })

db.Photo.hasOne(db.Like, { foreignKey: 'photoID', sourceKey: 'photoID' })
db.Like.belongsTo(db.Photo, { foreignKey: 'photoID', targetKey: 'photoID' })

db.User.hasMany(db.Save, { foreignKey: 'userID', sourceKey: 'userID' })
db.Save.belongsTo(db.User, { foreignKey: 'userID', sourceKey: 'userID' })

db.Photo.hasMany(db.Report, { foreignKey: 'photoID', sourceKey: 'photoID' })
db.Report.belongsTo(db.Photo, { foreignKey: 'photoID', sourceKey: 'photoID' })

db.Photo.hasMany(db.Report, { foreignKey: 'userID', sourceKey: 'userID' })
db.Report.belongsTo(db.Photo, { foreignKey: 'userID', sourceKey: 'userID'})

module.exports = db;