const express = require('express')
const app = express()
const User = require('./model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
// --- mongoose ---
mongoose.connect('mongodb://localhost:27017/authDemo')
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log(`Mongo Connection Error: ${err}`);
    })

// --- set engine ---
app.set('view engine','ejs')
app.set('views','views')
// --- to parse URL-encoded ---
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'notagoodsecret' ,resave: false, saveUninitialized:false }))

// --- API ---
const requireLogin = (req,res,next) => {
    if (!req.session.user_id) {
        res.redirect('/login')
    }
    next()
}


// --- home page ---
app.get('/',(req,res)=>{
    res.send('Home page!')
})
// --- registration ---
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register', async (req,res)=>{
    const { username, password } = req.body
    const user = new User({username,password})
    await user.save()
    req.session.user_id = user._id
    res.redirect(`/`)
})
// --- login ---
app.get('/login', (req,res)=>{
    res.render('login')
})
app.post('/login', async (req,res) =>{
    const { username, password } = req.body
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        req.session.user_id = foundUser._id
        res.redirect('/secret')
    }else{
        res.redirect('/login')
    }
})
// --- logout ---
app.post('/logout',(req,res) =>{
    // req.session.user_id = null // actually this is enough to logout
    req.session.destroy() // remove entirely session
    res.redirect('/login')
})

// --- after login ---
app.get('/secret',requireLogin,(req,res)=>{
    res.render('secret')
})
app.get('/topSecret',requireLogin,(req,res)=>{
    res.send('TopSecret')
})

// --- server ---
app.listen(3000,()=>{
    console.log('server is running on port: 3000');
})