const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("report", {
      userID: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
      },
      photoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull : false,
      }
  },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
  });
};