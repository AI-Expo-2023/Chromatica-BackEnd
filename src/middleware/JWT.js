const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
    const accessToken = req.headers.authorization.split('Bearer ')[1] || req.query.token;
    const secretKey = process.env.secretKey;

    if (!accessToken) {
        return res.status(401).json({
        message: "로그인이 필요합니다.",
        });
    }

    try {
        return jwt.verify(accessToken, secretKey, (err, decoded) => {
            req.decoded = decoded;
            next();
        })
    } catch (err) {
        console.error(err);

        return res.status(401).json({
        message: "로그인이 필요합니다.",
        });
    }
};

module.exports = tokenVerify;