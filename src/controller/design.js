const { Save } = require('../models');

require('dotenv').config();

const createSaveImage = async (req, res) => {
    const userID = req.decoded.id;

    const photo = req.body.imageURL;
    console.log(photo, req.body)

    try {
        if (!userID) {
            return res.status(401).json({
                "message" : "로그인이 필요합니다." 
            })
        }
        const thisSave = await Save.findOne({
            where: { photo }
        })
        if (thisSave) {
            return res.status(409).json({
                "message" : "중복된 저장입니다."
            })
        }
        const newSave = await Save.create({
            userID,
            photo,
        })
        return res.status(201).json({
            "message" : "요청에 성공했습니다.",
            "imageURL" : newSave.photo
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

module.exports = {
    createSaveImage,
}