const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize({ ...config, sync: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Design = require('./design')(sequelize, Sequelize);
db.Photo = require('./photo.js')(sequelize, Sequelize);
db.Like = require('./like.js')(sequelize, Sequelize);

db.User.hasOne(db.Design, { foreignKey: 'userID', sourceKey: 'userID' })
db.Design.belongsTo(db.User, { foreignKey : 'userID', targetKey : 'userID'})

db.User.hasMany(db.Photo, { foreignKey: 'userID', sourceKey: 'userID' })
db.Photo.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'userID' })

db.Design.hasOne(db.Photo, { foreignKey: 'imageID', sourceKey: 'imageID' })
db.Photo.belongsTo(db.Design, { foreignKey: 'imageID', targetKey: 'imageID' })

db.User.hasMany(db.Like, { foreignKey: 'userID', sourceKey: 'userID' })
db.Like.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'userID' })

db.Photo.hasOne(db.Like, { foreignKey: 'photoID', sourceKey: 'photoID' })
db.Like.belongsTo(db.Photo, { foreignKey: 'photoID', targetKey: 'photoID' })

module.exports = db;