const { User, Photo, Like, Save, Design, Report } = require('../models');
const crypto = require('crypto');
const upload = require('../middleware/multer');
const path = require('path')
const verifyToken = require('../middleware/JWT');
const emailSending = require('../middleware/email');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Op } = require('sequelize');

dotenv.config();

const createUser = async(req, res) => {
    const userID = req.body.ID;
    const PW = req.body.PW;
    const name = req.body.name;
    const Email = req.body.Email;
    const photo = '/upload/image.png';

    try {
        const salt = crypto.randomBytes(32).toString("hex");
        const hashPassword = crypto
            .pbkdf2Sync(PW, salt, 2, 32, "sha512")
            .toString("hex");

        const userEmail = await User.findOne({
            where: { Email },
        });

        const id = await User.findOne({
            where: { userID }
        })

        if (userEmail || id) {
            return res.status(409).json({
                message: "중복된 아이디나 이메일입니다.",
            });
        }

        await User.create({
            userID,
            Email,
            name,
            PW: hashPassword,
            salt,
            photo,
        });

        return res.status(201).json({
            Email,
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const deleteUser = async (req, res) => {
    const userID = req.decoded.id;

    try {
        if (req.headers.authorization) {
            const thisUser = User.findOne({
                where: {userID},
            })

            if (!thisUser) {
                return res.status(404).json({ "message": "존재하지 않는 계정입니다." })
            }

            User.destroy({
                where : {userID}
            })

            Like.destroy({
                where : {userID}
            })

            Photo.destroy({
                where : {userID}
            })
            
            Design.destroy({
                where : {userID}
            })

            Save.destroy({
                where : {userID}
            })

            Report.destroy({
                where : {userID}
            })

            return res.status(204).json({})
        }

        return res.status(401).json({
            "message" : "로그인이 필요합니다."
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const userPhoto = async (req, res) => {
    const userID = req.params.userID;

    try {
        const thisUser = await User.findOne({
            where: { userID },
        })

        if (!thisUser) return res.status(404).json({
            "message" : "요청하신 사용자를 찾을 수 없습니다."
        })
        
        const ext = path.extname(req.file.originalname);
        const filePath = `${path.basename(req.file.originalname, ext)}${Date.now()}${ext}`;

        await thisUser.update({
            photo: filePath,
        })

        return res.status(200).json({
            "message" : "요청에 성공했습니다."
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const verifyEmail = (req, res) => {

    const { Email } = req.body;

    const verifyCode = Math.floor(Math.random() * 888889) + 111111;

    try {
        if (!Email) return res.status(404).json({
            "message" : "이메일을 입력해주세요."
        })
        else {
            emailSending.Server(Email, res, verifyCode);
            return res.status(201).json({
            "message": "요청에 성공했습니다.",
            "code" : verifyCode,
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const signIn = async (req, res) => {
    const userID = req.body.ID;
    const PW = req.body.PW;
    const Secret = process.env.secretKey;

    try {
        const thisUser = await User.findOne({
            where: { userID },
        })
        
        if (!thisUser) return res.status(404).json({
            "message" : "존재하지 않는 아이디입니다."
        })

        if (thisUser.accessToken) return res.status(409).json({
            "message" : "이미 로그인한 상태입니다."
        })

        const hashPassword = crypto
            .pbkdf2Sync(PW, thisUser.salt, 2, 32, "sha512")
            .toString("hex");

        if (thisUser.PW == hashPassword) {
            const accessToken = jwt.sign({
                id: thisUser.userID,
            }, Secret)

            await thisUser.update({
                accessToken,
            })

            return res.status(200).json({
                "message": "요청에 성공했습니다.",
                accessToken
            })
        }
        
        else {
            return res.status(409).json({
                "message" : "비밀번호가 일치하지 않습니다."
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const signOut = async (req, res) => {
    const userID = req.decoded.id;

    try {
        if (!userID) return res.status(404).json({
            "message" : "로그인이 필요합니다."
        })

        const thisUser = await User.findOne({
            where: {userID}
        })

        await thisUser.update({
            accessToken : null,
        })

        return res.status(204).json({})
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const getUser = async (req, res) => {
    const userID = req.decoded.id;

    try{
    const thisUser = await User.findOne({
        where : { userID }
    })
    if(!thisUser) {
        return res.status(404).json({
        "message" : "URI를 찾을 수 없습니다."
        })
    }
    return res.status(200).json({
        userID,
        "userName" : thisUser.name,
        "userEmail" : thisUser.Email,
        "userPhoto" : thisUser.photo,
    });
    } catch ( err ) {
        console.error(err)
        return res.status(400).json({
        "message" : "요청에 실패했습니다."
        })
        
    }
}

const getOtherUser = async (req, res) => {
    const userID = req.params.userID;

    try {
      const thisUser = await User.findOne({
        where: { userID },
      });
        
        if (!thisUser) {
            return res.status(404).json({
              "message" : "존재하지 않는 계정입니다."
          })
      }
  
        return res.status(200).json({
          userID,
          name: thisUser.name,
          Email: thisUser.Email,
          photo: thisUser.photo,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        message: "요청에 실패했습니다.",
      });
    }
  };

const findPW = async(req, res)=>{
    const { Email, new_PW } = req.body;
    try {
      const thisUser = await User.findOne({
        where: {
          Email
        },
      });
      const newHashPassword = crypto
        .pbkdf2Sync(new_PW, thisUser.salt, 2, 32, "sha512")
        .toString("hex");
  
      await thisUser.update({
        PW: newHashPassword,
      });
  
      res.status(200).json({
        Email,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: "요청에 실패했습니다.",
      });
    }
}

const updatePW = async (req, res) => {
    const userID = req.decoded.id;
    const { PW, newPW } = req.body;

    try {
        const thisUser = await User.findOne({
            where: { userID }
        })
        
        if (!thisUser) {
            return res.status(404).json({
                "message" : "존재하지 않는 계정입니다."
            })
        }
        
        const HashPassword = crypto
        .pbkdf2Sync(PW, thisUser.salt, 2, 32, "sha512")
        .toString("hex");
      
        if (HashPassword !== thisUser.PW) {
            return res.status(409).json({
                "message" : "비밀번호가 일치하지 않습니다."
            })
        }

        const newHashPassword = crypto
        .pbkdf2Sync(newPW, thisUser.salt, 2, 32, "sha512")
        .toString("hex");
        
        thisUser.update({
            PW : newHashPassword,
        })

        return res.status(200).json({
            "message" : "요청에 성공했습니다."
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const updateUser = async (req, res) => {
    const userID = req.decoded.id;
    const newName = req.body.name;

    try {
        const thisUser = await User.findOne({
            where: { userID },
        })

        if (!thisUser) {
            return res.status(404).json({
                "message" : "존재하지 않는 계정입니다."
            })
        }

        if (req.file) {
            const ext = path.extname(req.file.originalname);
            const filePath = `${path.basename(req.file.originalname, ext)}${Date.now()}${ext}`;

            console.log(filePath)

            await thisUser.update({
                name: newName,
                photo: filePath,
            })

            return res.status(200).json({
                thisUser
            })
        }

        await thisUser.update({
            name : newName,
        })

        return res.status(200).json({
            thisUser
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const otherUserImage = async (req, res) => {
    const userID = req.params.userID;
    const { pageNumber } = req.params;

    try {
        const thisUser = await User.findOne({
            where: { userID }
        })
        if (!thisUser) {
            return res.status(404).json({
                "message" : "존재하지 않는 계정입니다."
            })
        }
        const images = await Photo.findAll({
            include: [{
                model: User,
                attributes: ['userID', 'name', 'photo']
            }],
            attributes: ['photoID', 'imageID', 'head', 'photo', 'like'],
            where: { userID },
            limit: 18,
            offset: (pageNumber - 1) * 18
        })

        const manyImage = await Photo.count({
            where: { userID }
        });

        return res.status(200).json({
            images,
            manyImage
        })

    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const likedPhoto = async (req, res) => {
    const userID = req.decoded.id;
    const { pageNumber } = req.params;

    try {
        const thisUser = await User.findOne({
            where: { userID }
        })    
        if (!thisUser) {
            return res.status(404).json({
                "message" : "존재하지 않는 계정입니다."
            })
        }

        const likedImage = await Like.findAll({
            where: { userID },
            include: [{
                model: Photo,
                attributes: ['imageID', 'photoID', 'head', 'photo', 'like']
            }, {
                model: User,
                attributes: ['name', 'photo']
                }
            ],
            attributes: ['photoID'],
            limit: 18,
            offset: (pageNumber - 1) * 18
        })

        const manyImage = await Like.count({
            where: { userID }
        })

        return res.status(200).json({
            images: likedImage,
            manyImage,
        })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const myPhoto = async (req, res) => {
    const userID = req.decoded.id;
    const { pageNumber } = req.params;

    try {
        const thisUser = await User.findOne({
            where: { userID }
        })
        if (!thisUser) {
            return res.status(404).json({
                "message" : "존재하지 않는 계정입니다."
            })
        }
        const images = await Photo.findAll({
            include: [{
                model: User,
                attributes: ['userID', 'name', 'photo']
            }],
            attributes: ['photoID', 'imageID', 'head', 'photo', 'like'],
            where: { userID },
            limit: 18,
            offset: (pageNumber - 1) * 18
        })

        const manyImage = await Photo.count({
            where: { userID }
        });

        return res.status(200).json({
            images,
            manyImage
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const saveImageList = async (req, res) => {
    const userID = req.decoded.id;
    const { pageNumber } = req.params;
    
    console.log(userID);

    try {
        const thisUser = await User.findOne({
            where: { userID }
        })
        if (!thisUser) {
            return res.status(404).json({
                "message" : "존재하지 않는 계정입니다."
            })
        }

        const thisUserSaved = await Save.findAll({
            where: { userID },
            limit: 18,
            offset: (pageNumber - 1) * 18
        })

        const manyImage = await Save.count({
            where: { userID }
        });

        return res.status(200).json({
            image: thisUserSaved,
            manyImage
        })

    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}
 
module.exports = {
    createUser,
    deleteUser,
    userPhoto,
    verifyEmail,
    signIn,
    signOut,
    getUser,
    getOtherUser,
    findPW,
    updatePW,
    updateUser,
    otherUserImage,
    likedPhoto,
    myPhoto,
    saveImageList,
}
