const express = require('express');
const router = express();

const user = require('./user');
const design = require('./design');

router.use('/user', user);
router.use('/design', design)

module.exports = router;