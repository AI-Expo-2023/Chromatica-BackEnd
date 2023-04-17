const express = require('express');
const router = express();
const controller = require('../controller/report');
const jwt = require('../middleware/JWT');

router.post('/:photoID', jwt, controller.reportPhoto);

module.exports = router;