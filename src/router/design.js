const express = require('express');
const router = express();

const upload = require('../middleware/multer');
const jwt = require('../middleware/JWT');

const controller = require('../controller/design');

router.post('/', jwt, upload.single("save"), controller.createSaveImage);

module.exports = router;