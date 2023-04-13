const express = require('express');
const router = express();
const controller = require('../controller/photo');

const upload = require('../middleware/multer');
const jwt = require('../middleware/JWT');

router.post('/', jwt, upload.single('photo'), controller.createPhoto);
//router.delete('/:id', controller.deletePhoto);
//router.get('/:id', controller.readPhoto);
// router.patch('/:id', controller.updatePhoto);


module.exports = router;