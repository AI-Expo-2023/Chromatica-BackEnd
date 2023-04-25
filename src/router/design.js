const express = require('express');
const router = express();

const jwt = require('../middleware/JWT');

const controller = require('../controller/design');

router.post('/new', jwt, controller.createSaveImage);
router.patch('/:imageID', jwt, controller.updateSaveImage);
router.delete('/delete', jwt, controller.deleteSaveImage);

module.exports = router;