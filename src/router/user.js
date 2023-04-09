const express = require('express');
const router = express();

const upload = require('../middleware/multer')

const controller = require('../controller/user');
const jwt = require('../middleware/JWT');

router.post('/sign', controller.createUser);
router.delete('/sign', jwt, controller.deleteUser);
router.patch('/:userID/photo', upload.single("profile"), controller.userPhoto);
router.post('/email', controller.verifyEmail);
router.post('/log', controller.signIn);
router.delete('/log', jwt, controller.signOut);

module.exports = router;