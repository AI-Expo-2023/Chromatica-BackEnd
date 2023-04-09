const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Design", {
        userID: {
              type: DataTypes.STRING(20),
              primaryKey: true,
              allowNull: false,
          },
        photo: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });
}