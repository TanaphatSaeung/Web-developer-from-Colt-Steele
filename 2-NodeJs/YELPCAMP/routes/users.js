const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const { registerController } = require('../controllers/users');

// --- register ---
router.route('/register')
    .get(registerController.register)
    .post(catchAsync(registerController.registerPost))

// -- login ---
router.route('/login')
    .get(registerController.login )
    .post(storeReturnTo,passport.authenticate(
        'local', 
        {failureFlash: true, failureRedirect: '/login' }), 
        registerController.loginPost
    )

// --- logout ---
router.get('/logout', registerController.logout)

module.exports = router