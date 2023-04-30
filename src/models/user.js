const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    userID: {
          type: DataTypes.STRING(20),
          primaryKey: true,
          allowNull: false,
      },
      PW: {
          type: DataTypes.STRING(),
          allowNull: false,
      },
      name: {
          type: DataTypes.STRING(12),
          allowNull: false,
      },
      Email: {
          type: DataTypes.STRING(),
          unique: true,
          allowNull: false,
      },
      photo: {
          type: DataTypes.STRING(),
          allowNull: false,
      },
      accessToken: {
          type: DataTypes.STRING(),
          allowNull: true,
      },
      salt: {
          type: DataTypes.STRING(),
          allowNull: true,
    }
  },
      {
          charset: 'utf8mb4',
          collate: 'utf8mb4_general_ci',
          updatedAt: false,
  });
};