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
router.patch('/findPW', controller.findPW);
router.patch('/updatePW', jwt, controller.updatePW);
router.get('/', jwt, controller.getUser);
router.get('/image', jwt, controller.myPhoto);
router.get('/save', jwt, controller.saveImageList);
router.get('/info/:userID', controller.getOtherUser);
router.patch('/updateInfo', jwt, upload.single("profile"), controller.updateUser);
router.get('/:userID/image', controller.otherUserImage);
router.get('/:userID/liked', controller.likedPhoto);

module.exports = router;