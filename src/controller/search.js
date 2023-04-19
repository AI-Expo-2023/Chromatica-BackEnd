const { Op } = require("sequelize");
const { Photo , User } = require("../models");


const search = async (req, res) => {
    const searchWord = req.body.searchWord;
    const pageNumber = req.params.pageNumber;

    try {        
        const manyImage = await Photo.count({
            where: { 
                [Op.or]: [{
                    head: { [Op.like]: `%${searchWord}%` }
                },{
                    description: { [Op.like]: `%${searchWord}%` }
                },{
                    tag: { [Op.like]: `%${searchWord}%` }
                }]
            }
            
        })

        const searchedPhoto = await Photo.findAll({
            include: [{
                model: User,
                attributes: ['userID', 'name', 'photo'],
            }],
            where: { 
                [Op.or]: [{
                    head: { [Op.like]: `%${searchWord}%` }
                },{
                    description: { [Op.like]: `%${searchWord}%` }
                },{
                    tag: { [Op.like]: `%${searchWord}%` }
                },
                ]
            },
            attributes: ['photoID', 'photo', 'head', 'like'],
            limit: 18,
            offset: (pageNumber - 1) * 18,
            order: [['createdAt', 'DESC']]
        })

        return res.status(200).json({
            "message" : "요청에 성공했습니다.",
            searchedPhoto,
            manyImage
        });
    } catch(err) {
        console.error(err);
        return res.status(400).json({
            "message" : "요청에 실패했습니다."
        });
        
    }
}

module.exports = {
 search,
}