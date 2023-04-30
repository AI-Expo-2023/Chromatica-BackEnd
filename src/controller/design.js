const { Save } = require('../models');

require('dotenv').config();

const createSaveImage = async (req, res) => {
    const userID = req.decoded.id;

    const photo = req.body.imageURL;
    const photoID = req.body.imageURL.split('/')[4];

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
            photoID,
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

const updateSaveImage = async (req, res) => {
    const userID = req.decoded.id;
    const { imageURL } = req.body;
    const photoID = req.params.imageID;

    try {
        if (!userID) {
            return res.status(401).json({
                "message" : "로그인이 필요합니다."
            })
        }
        const thisSave = await Save.findOne({
            where: { photoID }
        })

        if (!thisSave) {
            return res.status(404).json({
                "message" : "임시저장한 작품이 존재하지 않습니다."
            })
        }
        await thisSave.update({
            photo : imageURL,
        })
        return res.status(200).json({
            "message" : "요청에 성공했습니다."
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const deleteSaveImage = async (req, res) => {
    const userID = req.decoded.id;
    const photoID = req.body.photoID;

    try {
        const thisSave = await Save.findOne({
            where: { photoID }
        })

        if(!thisSave){
            return res.status(404).json({})
        } else if (thisSave.userID != userID) {
            return res.status(403).json({})
        }

        await thisSave.destroy({})

        return res.status(204).json({})
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

module.exports = {
    createSaveImage,
    updateSaveImage,
    deleteSaveImage,
}