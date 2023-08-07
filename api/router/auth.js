const authContoller = require('../controller/auth');
const express = require('express');
const router = express.Router();


router.post('/register', authContoller.register);
router.post("/login", authContoller.login);
router.post('/logout', authContoller.logout)


module.exports = router;