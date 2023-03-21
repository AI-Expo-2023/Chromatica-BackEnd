const User = require('../models').User;
const crypto = require('crypto');
const upload = require('../middleware/multer');

const createUser = async(req, res) => {
    const userID = req.body.ID;
    const PW = req.body.PW;
    const name = req.body.name;
    const Email = req.body.Email;
    const photo = upload.single('image');

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

module.exports = {
    createUser,
}
