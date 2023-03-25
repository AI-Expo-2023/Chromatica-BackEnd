const User = require('../models').User;
const crypto = require('crypto');
const upload = require('../middleware/multer');
const emailSending = require('../middleware/email');

const createUser = async(req, res) => {
    const userID = req.body.ID;
    const PW = req.body.PW;
    const name = req.body.name;
    const Email = req.body.Email;
    const photo = '../upload/image.png';

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
            "message" : "회원가입에 성공했습니다.",
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

const userPhoto = async (req, res) => {
    const userID = req.params.userID;
    const photo = req.file;

    console.log(photo)

    try {
        const user = await User.findOne({
            where: { userID },
        })

        if (!user) return res.status(404).json({
            "message" : "요청하신 사용자를 찾을 수 없습니다."
        })

        await user.update({
            photo,
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

    const code = () => {
        return Math.floor(Math.random() * 888889) + 111111;
    }

    const verifyCode = code();

    try {
        emailSending.Server(req, res, verifyCode);
        return res.status(201).json({
            "message": "요청에 성공했습니다.",
            "code" : verifyCode,
        })
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        })
    }
}

module.exports = {
    createUser,
    userPhoto,
    verifyEmail,
}
