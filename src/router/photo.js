const express = require('express');
const router = express();
const controller = require('../controller/photo');

const upload = require('../middleware/multer');
const jwt = require('../middleware/JWT');

router.post('/', jwt, upload.single('photo'), controller.createPhoto);
router.patch('/:photoID', jwt, controller.updatePhoto);
router.get('/:photoID', controller.readPhoto);
router.delete('/:photoID', jwt, controller.deletePhoto);
router.post('/:photoID/like', jwt, controller.like);
router.delete('/:photoID/like', jwt, controller.like);

module.exports = router;