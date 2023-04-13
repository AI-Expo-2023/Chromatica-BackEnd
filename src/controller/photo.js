const { Photo, Design } = require('../models');
const path = require('path');

const { Op } = require('sequelize');

const createPhoto = async (req, res) => {
    const photo = req.file;
    const {head, tag, description} = req.body;
    
    const userID = req.decoded.id;

    const ext = path.extname(req.file.originalname);
    const filePath = `${path.basename(req.file.originalname, ext)}`
    
  try {  
    if (!photo || !head || !tag || !description) {
      return res.status(400).json({
        message: "요청에 실패했습니다.",
      });
    }

    const thisDesign = await Design.findOne({
        where: {
          photo : {[Op.startsWith] : filePath},
          },
    });

    console.log(thisDesign)

    const thisPhoto = await Photo.create({
        photoID : thisDesign.imageID,
        userID,
        photo : thisDesign.photo,
        head,
        tag,
        description,
    });

    res.status(201).json({
        "message" : '게시물 작성 성공',
    });

    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({
              message: '요청에 실패했습니다.',
           });
        } else if (err.name === 'JsonWebTokenError') {
            res.status(401).json({
              message: '로그인이 필요합니다.',
            });
        } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
            res.status(404).json({
              message: 'URI를 불러오지 못했습니다.',
            });
        }
        
        console.error(err);
        return res.status(400).json({"message" : "에러"});
    }
    
};
  
module.exports = {
  createPhoto,
};

