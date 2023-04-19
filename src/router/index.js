const express = require('express');
const router = express();

const main = require('./main');
const user = require('./user');
const design = require('./design');
const photo = require('./photo');
const search = require('./search');

router.use('/', main);
router.use('/user', user);
router.use('/design', design);
router.use('/photo', photo);
router.use('/search', search);

module.exports = router;