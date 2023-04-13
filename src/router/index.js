const express = require('express');
const router = express();

const user = require('./user');
const design = require('./design');
const photo = require('./photo');

router.use('/user', user);
router.use('/design', design);
router.use('/photo', photo);

module.exports = router;