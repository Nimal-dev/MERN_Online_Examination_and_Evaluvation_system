const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');


router.post('/SignUp', authController.SignUp);

router.post('/SignIn', authController.SignIn);



module.exports = router;