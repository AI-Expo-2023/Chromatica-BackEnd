const router = require('express')();

const controller = require('../controller/main');

router.get('/', controller.getMain);
router.get('/rank', controller.getRank);

module.exports = router;