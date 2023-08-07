const postContoller = require('../controller/users');
const express = require('express');
const router = express.Router();


router.get('/userss', postContoller.addusers);

module.exports = router;