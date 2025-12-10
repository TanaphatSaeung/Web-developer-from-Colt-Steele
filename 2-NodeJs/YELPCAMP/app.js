const express = require('express')
const path = require('node:path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const Campground = require('./models/campgroud')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const { campgroundJoiSchema } = require('./schemas')
const methodOverride = require('method-override')
// --------------------------------
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log(`Mongo Connection Error: ${err}`);
    })

const db = mongoose.connection
// --------------------------------
const app = express()
const port = 8000
// --------------------------------
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
// --------------------------------

// --- Joi Validation ---
const validateCampgroundSchema = (req,res,next) => {
    // --- Error Handling ---
    const {error} = campgroundJoiSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else {
        next()
    }
}

// --- home ---
app.get('/',(req,res)=>{
    res.render('home')
})

// --- inquiry ---
app.get('/campground', async (req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
})

// --- new campground ---
app.get('/campground/new', async (req,res)=>{
    res.render('campgrounds/new')
})
// --- new campground ---
app.post('/campground', validateCampgroundSchema,catchAsync(async (req,res,next)=>{
    // --- Insert new camp! ---
    const campgrounds = new Campground(req.body.campground)
    await campgrounds.save()
    res.render('campgrounds/show',{campgrounds})
}))

// --- edit campground ---
app.get('/campground/:id/edit', catchAsync(async (req,res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit',{campground})
}))
// --- edit campground ---
app.put('/campground/:id', validateCampgroundSchema,catchAsync(async (req,res)=>{
    const { id } = req.params
    const { title, location } = req.body.campground
    const campground = await Campground.findByIdAndUpdate(id,{title:title,location:location},{runValidators: true, new: true})
    res.redirect(`/campground/${campground._id}`)
}))
// --- delete campground ---
app.delete('/campground/:id', catchAsync(async (req,res)=>{
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect(`/campground`)
}))
// --- inquiry detail ---
app.get('/campground/:id', async (req,res)=>{
    const {id} = req.params
    const campgrounds = await Campground.findById(id)
    res.render('campgrounds/show',{campgrounds})
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