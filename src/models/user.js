const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    userID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
    },
    PW: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // 포함 : ! @ # $ % ^ & *  
    },
    name: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING(),
        allowNull: true,
    },
    reported: {
        type: DataTypes.INT(),
        allowNull: false,
    },
  });
};

