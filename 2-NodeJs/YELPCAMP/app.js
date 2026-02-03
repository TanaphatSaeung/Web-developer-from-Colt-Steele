const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('node:path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
// --- router ---
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

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

// --- midleware flash ---
app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// --------------------------------
// --- Router ---
// --- campground ---
app.use('/campground', campgrounds)
// --- review ---
app.use('/campground/:id/reviews', reviews)

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