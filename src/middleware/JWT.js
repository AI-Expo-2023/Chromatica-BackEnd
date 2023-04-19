const jwt = require("jsonwebtoken");
const { User } = require("../models");

const tokenVerify = async (req, res, next) => {
    const accessToken = req.headers.authorization.split('Bearer ')[1] || req.query.token;
    const secretKey = process.env.secretKey;

    if (!accessToken) {
        return res.status(401).json({
        message: "로그인이 필요합니다.",
        });
    }

    try {
        return jwt.verify(accessToken, secretKey, async (err, decoded) => {

            const thisUser = await User.findOne({
                where: { userID: decoded.id },
            })

            if (accessToken != thisUser.accessToken) {
                return res.status(409).json({
                    "message" : "유효하지 않은 토큰입니다."
                })
            }
            req.decoded = decoded;
            next();
        })
    } catch (err) {
        return res.status(400).json({
        message: "에러가 발생했습니다.",
        });
    }
};

module.exports = tokenVerify;