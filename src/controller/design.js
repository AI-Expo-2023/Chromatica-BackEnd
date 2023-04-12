const { Save } = require('../models');
const path = require('path')

require('dotenv').config();

const saveImage = async (req, res) => {
    const userID = req.decoded.id;
    const accessToken = req.headers.authorization;

    const ext = path.extname(req.file.originalname);
    const filePath = `${path.basename(req.file.originalname, ext)}${Date.now()}${ext}`;

    try {
        if (!accessToken) {
            return res.status(401).json({
                "message" : "로그인이 필요합니다." 
            })
        }

        const thisSave = await Save.findOne({
            where: {userID},
        })

        if (!thisSave) {
            const newSave = await Save.create({
                userID,
                photo: filePath,
            })

            return res.status(201).json({
                "photoPath" : newSave.photo
            })
        }

        await thisSave.update({
            photo : filePath
        })

        return res.status(201).json({
            "photoPath": thisSave.photo
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

module.exports = { saveImage }