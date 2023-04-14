const express = require('express');
const router = express();
const controller = require('../controller/photo');

const upload = require('../middleware/multer');
const jwt = require('../middleware/JWT');

router.post('/', jwt, upload.single('photo'), controller.createPhoto);
router.get('/:photoID', jwt, controller.readPhoto);
router.delete('/:photoID', jwt, controller.deletePhoto);

module.exports = router;