const router = require('express')();

const controller = require('../controller/search');

router.post('/:pageNumber', controller.search);

module.exports = router;