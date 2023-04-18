const { Op } = require('sequelize')
const { Photo, User } = require('../models')

const getMain = async (req, res) => {
    try {
        const sortPhoto = await Photo.findAll({
            include: [{
                model: User,
                attributes: ['name', 'photo', 'userID']
            }],
            attributes: ['photoID', 'photo', 'head', 'like'],
            limit: 6,
            order: [['like', 'DESC']]
        })

        return res.status(200).json({
            "message": "조회에 성공했습니다.",
            sortPhoto,
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const getRank = async (req, res) => {
    try {
        const sortPhoto = await Photo.findAll({
            include: [{
                model: User,
                attributes: ['name', 'photo', 'userID']
            }],
            attributes: ['photoID', 'photo', 'head', 'like'],
            limit: 18,
            order: [['like', 'DESC']]
        })

        return res.status(200).json({
            "message": "조회에 성공했습니다.",
            sortPhoto,
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

module.exports = {
    getMain,
    getRank,
}