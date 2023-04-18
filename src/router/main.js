const router = require('express')();

const controller = require('../controller/main');

router.get('/', controller.getMain);

module.exports = router;