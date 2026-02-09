const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('node:path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/users')
// --- router ---
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')

// --------------------------------
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log(`Mongo Connection Error: ${err}`);
    })
// --------------------------------
const app = express()
const port = 8000
// --------------------------------
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
// --- session configuraton ---
const sessionConfig = {
    secret: 'thisisscret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig))
app.use(flash())

// --- passport ---
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser()) // how to serialize a user, how to store a user in a session
passport.deserializeUser(User.deserializeUser()) // how to delete a user in a session
// these above came from 'PassportLocalMongoose' plugin

// --- midleware flash ---
app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// app.get('/fakeUser', async(req,res)=>{
//     const user = new User({email: 'gusty@gmail.com', username: 'gusty'})
//     const newUser = await User.register(user, 'bunny') // this will provide a hash and salt for us, it's not using bcrypt. it's Pbkdf2
//     res.send(newUser)
// })

// --------------------------------
// --- Router ---
// --- campground ---
app.use('/campground', campgroundRoutes)
// --- review ---
app.use('/campground/:id/reviews', reviewRoutes)
// --- review ---
app.use('/', userRoutes)

// --- home ---
app.get('/',(req,res)=>{
    res.render('home')
})

app.all(/(.*)/, (req, res, next) => {
    return next(new ExpressError('Page Not Found',404))
})

app.use((err,req,res,next)=>{
    const { status = 500 } = err

    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(status).render('error', { err })
})

app.listen(port,()=>{
    console.log(`SERVER IS RUNNING ON PORT: ${port}`);
})