const User = require('../models/users')

module.exports.registerController = {
    register: (req,res) => {
        res.render('users/register')
    },
    registerPost: async (req,res) => {
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
    },
    login: (req,res) => {
        res.render('users/login')
    },
    loginPost: (req,res) => {
        try {  
            req.flash('success','Welcome back!')
            const redirectUrl = res.locals.returnTo || '/campground'; 
            res.redirect(redirectUrl)
        } catch (err) {
            req.flash('error', err.message)
            console.log(err);
        }
    },
    logout: (req,res,next)=>{
        req.logout(function(err) {
            if (err) {
                return next(err)
            }
            req.flash('success','Goodbye!')
            res.redirect('/campground')
        })
    }
}