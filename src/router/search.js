const router = require('express')();

const controller = require('../controller/search');

router.get('/:pageNumber', controller.search);

module.exports = router;