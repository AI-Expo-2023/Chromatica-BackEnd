const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Photo", {
        imageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        photoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull : false,
        },
        userID: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
        },
        head: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        tag: {
            type: DataTypes.STRING,
        },
        like: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        reported: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    }, 
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    })
}