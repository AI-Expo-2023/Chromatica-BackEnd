const express = require('express');
const router = express();

const upload = require('../middleware/multer')

const controller = require('../controller/user');
const jwt = require('../middleware/JWT');

router.post('/sign', controller.createUser);
router.delete('/sign', jwt, controller.deleteUser);
router.post('/email', controller.verifyEmail);
router.post('/log', controller.signIn);
router.delete('/log', jwt, controller.signOut);
router.patch('/findPW', controller.findPW);
router.patch('/updatePW', jwt, controller.updatePW);
router.get('/', jwt, controller.getUser);
router.get('/image/:pageNumber', jwt, controller.myPhoto);
router.get('/save/:pageNumber', jwt, controller.saveImageList);
router.get('/info/:userID', controller.getOtherUser);
router.patch('/updateInfo', jwt, upload.single("photo"), controller.updateUser);
router.get('/upload/:filePath', controller.getProfilePhoto);
router.get('/:userID/image/:pageNumber', controller.otherUserImage);
router.get('/liked/:pageNumber', jwt,controller.likedPhoto);

module.exports = router;