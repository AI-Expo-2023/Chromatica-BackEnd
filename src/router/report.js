const express = require('express');
const router = express();
const controller = require('../controller/report');

router.post('/:photoID/report', jwt, controller.reportPhoto);

module.exports = router;