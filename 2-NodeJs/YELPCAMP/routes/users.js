const express = require('express')
const router = express.Router()
const User = require('../models/users')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware');

// --- register ---
router.get('/register', (req,res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req,res) => {
    try {
        const { username, password, email } = req.body
        const user = new User({ username, email})
        const registeredUser = await User.register(user,password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success','Welcome to Yelpcamp!')
            res.redirect('/campground')
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('register')
        console.log(err);
        
    }
}))

// -- login ---
router.get('/login', (req,res) => {
    res.render('users/login')
})
router.post('/login', storeReturnTo,passport.authenticate('local', {failureFlash: true, failureRedirect: '/login' }), (req,res) => {
    try {  
        req.flash('success','Welcome back!')
        const redirectUrl = res.locals.returnTo || '/campgrounds'; 
        res.redirect(redirectUrl)
    } catch (err) {
        req.flash('error', err.message)
        console.log(err);
    }
})
// --- logout ---
router.get('/logout',(req,res,next)=>{
    req.logout(function(err) {
        if (err) {
            return next(err)
        }
        req.flash('success','Goodbye!')
        res.redirect('/campground')
    })
})

module.exports = router