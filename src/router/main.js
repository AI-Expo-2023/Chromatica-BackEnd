const router = require('express')();

const controller = require('../controller/main');

const { Photo } = require('../models');

setInterval(async () => {
    await Photo.findAll({
        order: [['like', 'DESC']],
    })
}, 1000 * 3600 * 24)

router.get('/', controller.getMain);

module.exports = router;