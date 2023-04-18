const { Op } = require('sequelize')
const { Photo, User } = require('../models')

const getMain = async (req, res) => {
    try {
        const sortPhoto = await Photo.findAll({
            include: [{
                model: User,
                attributes: ['name', 'photo']
            }],
            order: [['like', 'DESC']],
            attributes: ['photoID', 'photo', 'head', 'like']
        })

        return res.status(200).json({
            "message": "조회에 성공했습니다.",
            sortPhoto
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
}