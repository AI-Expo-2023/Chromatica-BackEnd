const { Photo, User, Like, Save } = require('../models');
const path = require('path');
const jwt = require('../middleware/JWT');

const { Op } = require('sequelize');

const createPhoto = async (req, res) => {
   const { photo, head, description } = req.body;
   const tagString = req.body.tag.join(',');
  
    const photoID = req.body.photo.split('/')[4];
    
    const userID = req.decoded.id;
    
  try {  
    if (!photo || !head || !tagString || !description) {
      return res.status(400).json({
        message: "요청에 실패했습니다.",
      });
    }

    console.log(photo)

    const thisSave = await Save.findOne({
        where: { photo }
    })

    if (thisSave) {
      console.log('saveDestroy');
      await thisSave.destroy({})
    }

    await Photo.create({
        photoID,
        userID,
        photo,
        head,
        tag : tagString,
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
  
const createPhotoDeleteSave = async (req, res) => {
  const { photo, head, description, imgId } = req.body;
  const tagString = req.body.tag.join(',');
 
   const photoID = req.body.photo.split('/')[4];
   
   const userID = req.decoded.id;
   
 try {  
   if (!photo || !head || !tagString || !description) {
     return res.status(400).json({
       message: "요청에 실패했습니다.",
     });
   }

  if (imgId) {
    const thisSave = await Save.findOne({
        where: { photoID : imgId }
    })

    if (thisSave) {
      await thisSave.destroy({})
    }     
  }

   await Photo.create({
       photoID,
       userID,
       photo,
       head,
       tag : tagString,
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
  const photoID = req.params.photoID;

  const userID = req.decoded ? req.decoded.id : null ;

  console.log(req.decoded,userID)

  try {
    const photo = await Photo.findOne({
      include: [{
        model: User,
        attributes: ['userID', 'name', 'photo'],
      }],
      where: { photoID }
    });

    if (!photo) {
      return res.status(404).json({
        "message": '해당 게시물이 존재하지 않습니다.',
      });
    }

    const tag = photo.tag.split(',')

    if(!userID){
      return res.status(200).json({
        "hadLiked" : false,
        "image": {
          "user": photo.User,
          "photo" : photo.photo,
          "head" : photo.head,
          "description" : photo.description,
          "like": photo.like,
          "tag" : tag,
          "reported" : photo.reported
        }
      })
    }

    const Liked = await Like.findOne({
      where: { userID, photoID }
    })

    const hadLiked = Liked ? true : false;

    return res.status(200).json({
      hadLiked,
      "image": {
        "user": photo.User,
        "photo" : photo.photo,
        "head" : photo.head,
        "description" : photo.description,
        "like": photo.like,
        "tag" : tag,
        "reported" : photo.reported
      }
    })

  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({
        "message": '잘못된 URI입니다.',
      });
    }
    console.error(err);
    return res.status(400).json({
      "message" : "요청에 실패했습니다."
    })
  }
};

const updatePhoto = async (req, res) => {
  const photoID = req.params.photoID;
  const userID = req.decoded.id;
  const { head, description } = req.body;
  const tag = req.body.tag.join(',');


  try {
    const photo = await Photo.findOne({
      where: { photoID },
    });

    if (!photo) {
      return res.status(404).json({
        message: '해당 게시물이 존재하지 않습니다.',
      });
    }

    if (photo.userID !== userID) {
      return res.status(403).json({
        message: '자신의 게시물에만 수정할 수 있습니다.',
      });
    }

    await photo.update({
      head,
      tag,
      description,
    });

    return res.status(200).json({
      message: '게시물 수정 성공',
    });
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({
        message: '잘못된 URI입니다.',
      });
    }
    return res.status(400).json({
      message: '요청에 실패했습니다.',
    });
  }
};


const deletePhoto = async (req, res) => {
    const photoID = req.params.photoID.split;
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

const like = async (req, res) => {
  const userID = req.decoded.id;
  const { photoID } = req.params;
  
  try {
    const thisPhoto = await Photo.findOne({
      where: { photoID }
    })
    if (!thisPhoto) {
      return res.status(404).json({
         "message" : "존재하지 않는 게시글입니다."
       })
    }

    if (thisPhoto.userID == userID) {
      return res.status(409).json({
        "message" : "자신의 작품에는 좋아요를 누를 수 없습니다."
      })
    }
  
    const thisLike = await Like.findOne({
      where: { photoID, userID }
    })
    if (thisLike) {
      await thisLike.destroy({})
      await thisPhoto.update({
        like: thisPhoto.like - 1,
      })
      return res.status(204).json()
    } else {
      await Like.create({
        userID,
        photoID,
      })
      await thisPhoto.update({
        like : thisPhoto.like + 1,
      })
      return res.status(201).json({
        "message" : "좋아요를 생성했습니다."
      })
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      "message" : "요청에 실패했습니다."
    })
  }
}

module.exports = {
  createPhoto,
  createPhotoDeleteSave,
  readPhoto,
  updatePhoto,
  deletePhoto,
  like,
};

