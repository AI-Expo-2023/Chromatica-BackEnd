const express = require('express');
const router = express();

const upload = require('../middleware/multer');
const jwt = require('../middleware/JWT');

const controller = require('../controller/design');

router.put('/', jwt, upload.single("save"), controller.saveImage);

module.exports = router;