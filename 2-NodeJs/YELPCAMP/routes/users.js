const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const { registerController } = require('../controllers/users');

// --- register ---
router.get('/register', registerController.register)
router.post('/register', catchAsync(registerController.registerPost))

// -- login ---
router.get('/login', registerController.login )
router.post('/login', storeReturnTo,passport.authenticate(
    'local', 
    {failureFlash: true, failureRedirect: '/login' }), 
    registerController.loginPost
)
// --- logout ---
router.get('/logout', registerController.logout)

module.exports = router