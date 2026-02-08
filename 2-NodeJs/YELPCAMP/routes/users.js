const express = require('express')
const router = express.Router()
const User = require('../models/users')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')

router.get('/register', (req,res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req,res) => {
    try {
        const { username, password, email } = req.body
        const user = new User({ username, email})
        const registeredUser = await User.register(user,password)
        req.flash('success','Welcome to Yelpcamp!')
        res.redirect('/campground')
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('register')
        console.log(err);
        
    }
}))

router.get('/login', (req,res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login' }), (async (req,res) => {
    try {  
        req.flash('success','Welcome back!')
        res.redirect('/campground')
    } catch (err) {
        req.flash('error', err.message)
        console.log(err);
    }
}))

module.exports = router