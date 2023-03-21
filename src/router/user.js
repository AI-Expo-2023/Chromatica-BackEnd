const express = require('express');
const router = express();

const controller = require('../controller/user');

router.post('/sign', controller.createUser);

module.exports = router;