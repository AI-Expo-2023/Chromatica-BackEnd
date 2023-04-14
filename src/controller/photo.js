const { Photo, Design, User, Like } = require('../models');
const path = require('path');

const { Op } = require('sequelize');

const createPhoto = async (req, res) => {
    const { photo, head, tag, description} = req.body;
    
    const userID = req.decoded.id;
    
  try {  
    if (!photo || !head || !tag || !description) {
      return res.status(400).json({
        message: "요청에 실패했습니다.",
      });
    }

    const thisDesign = await Design.findOne({
        where: { photo },
    });

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
  
const readPhoto = async (req, res) => {
  const photoID = req.params.photoID.split(':')[1];
  const userID = req.decoded.id || null;

    try {
      const photo = await Photo.findOne({
        where: { photoID }
      });

      console.log(photo)

      if (!photo) {
        return res.status(404).json({
          "message": '해당 게시물이 존재하지 않습니다.',
        });
      }
  
      if(!userID){
        return res.status(200).json({
          "hadLiked" : false,
          "image" : {
            "photo" : photo.photo,
            "head" : photo.head,
            "user" : photo.userID,
            "description" : photo.description,
            "like" : photo.like,
            "reported" : photo.reported
          }
        })
      }

      const hadLiked = await Like.findOne({
        where: { photoID }
      })

      return res.status(200).json({
        hadLiked,
        "image" : {
          "photo" : photo.photo,
          "head" : photo.head,
          "user" : photo.userID,
          "description" : photo.description,
          "like" : photo.like,
          "reported" : photo.reported
        }
      })

    } catch (err) {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({
          "message": '잘못된 URI입니다.',
        });
      }
      return res.status(400).json({
        "message" : "요청에 실패했습니다."
      })
  }
};

const deletePhoto = async (req, res) => {
    const photoID = req.params.photoID.split(':')[1];
    const userId = req.decoded.id;

    try {
      if(!userId) {
        return res.status(401).json({
          "message" : "로그인이 필요합니다."
        })
      }

      const photo = await Photo.findOne({
        where: {
          photoID,
        },
      });
  
      console.log(photo);
  
      if (photo.userID != userId) {
        res.status(403).json({
          "message": '자신의 계정에만 액세스할 수 있습니다',
        });
      } else {
        await Like.destroy({
          where: { photoID },
      });
        await photo.destroy();
  
        res.status(204).json({});
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        "message": '요청에 실패했습니다.'
      });
    }
};

module.exports = {
  createPhoto,
  readPhoto,
  deletePhoto,
};
