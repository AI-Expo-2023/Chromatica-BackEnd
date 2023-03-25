const express = require('express');
const router = express();

const upload = require('../middleware/multer')

const controller = require('../controller/user');

router.post('/sign', controller.createUser);
router.patch('/:userID/photo', upload.single("profile"), controller.userPhoto);
router.post('/email', controller.verifyEmail);

module.exports = router;