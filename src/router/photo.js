const express = require('express');
const router = express();
const controller = require('../controller/photo');
const reportController = require('../controller/report');

const upload = require('../middleware/multer');
const jwt = require('../middleware/JWT');
const newJwt = require('../middleware/newVerify');

router.post('/', jwt, upload.single('photo'), controller.createPhoto);
router.patch('/:photoID', jwt, controller.updatePhoto);
router.get('/:photoID', newJwt ,controller.readPhoto);
router.delete('/:photoID', jwt, controller.deletePhoto);
router.post('/:photoID/like', jwt, controller.like);
router.delete('/:photoID/like', jwt, controller.like);
router.post('/:photoID/report', jwt, reportController.reportPhoto);

module.exports = router;