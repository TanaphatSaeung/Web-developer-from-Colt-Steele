if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const sanitizeV5 = require('./utils/mongoSanitizeV5.js');
const express = require('express')
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const flash = require('connect-flash')
const helmet = require('helmet')
const path = require('node:path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/users')
// const db_url = process.env.DB_URL
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
// --- router ---
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')
// --------------------------------
mongoose.connect(dbUrl)
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log(`Mongo Connection Error: ${err}`);
    })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
// --------------------------------
const app = express()
app.set('query parser', 'extended');
const port = 8000
// --------------------------------
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
app.use(sanitizeV5({ replaceWith: '_' }));

const secret = process.env.SECRET;
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

// --- session configuraton ---
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig))
app.use(flash())

// --- helmet ---
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
];
const connectSrcUrls = [
    "https://api.maptiler.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com",
                "https://images.unsplash.com",
                ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

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