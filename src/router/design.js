const express = require('express');
const router = express();

const jwt = require('../middleware/JWT');

const controller = require('../controller/design');

router.post('/', jwt, controller.createSaveImage);
router.patch('/:imageID', jwt, controller.updateSaveImage);

module.exports = router;