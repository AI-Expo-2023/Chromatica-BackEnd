const { Photo, Report, Like } = require('../models');

const reportPhoto = async (req, res) =>{
    const photoId = req.params.photoID;
    const userId = req.decoded.id;

    try {
        const photo = await Photo.findOne({
            where: { photoId }
        });

        if (!photo) {
            return res.status(404).json({
                "message" : "해당 게시글이 존재하지 않습니다."
            });
        }

        const reported = await Report.findOne({
            where: { userId, photoId }
        })

        if ( !reported ){
            await photo.update({
                reported : photo.reported + 1,
            }); 

            if(photo.reported >= 10){
                Like.destroy({
                    where: {
                        photoID : photoId,
                    }
                })
                photo.destroy({});
                return res.status(204).json({})
            }
        
            await Report.create({
                photoID : photoId,
                userID: userId, 
            });

            return res.status(200).json({
                "message" : "요청에 성공했습니다."
            });
        }
        
        return res.status(409).json({
            "message" : "이미 신고한 게시글입니다."
        })


    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            res.status(401).json({
                "message" : "로그인이 필요합니다."
            });
        } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
            res.status(404).json({
                "message" : "URI를 불러오지 못했습니다."
            });
        } else {
            res.status(400).json({
                "message" : "요청에 실패했습니다."
            });
        } 

        console.error(err);
    }
}
module.exports = {
    reportPhoto,
};

