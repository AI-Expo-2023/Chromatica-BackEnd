const sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Save", {
        imageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userID: {
              type: DataTypes.STRING(20),
              primaryKey: true,
              allowNull: false,
          },
        photo: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
    })
}