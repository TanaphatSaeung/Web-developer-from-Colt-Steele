const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { campgroundJoiSchema } = require('../schemas')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campgroud')

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

// --- inquiry ---
router.get('/', async (req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
})

// --- new campground ---
router.get('/new', async (req,res)=>{
    res.render('campgrounds/new')
})
// --- new campground ---
router.post('/', validateCampgroundSchema,catchAsync(async (req,res,next)=>{
    // --- Insert new camp! ---
    const campground = new Campground(req.body.campground);
    await campground.save();

    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campground/${campground._id}`);
}))

// --- edit campground ---
router.get('/:id/edit', catchAsync(async (req,res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', `Cannot find that campground`);
        res.redirect('/campground')
    } else {
        res.render('campgrounds/edit',{campground})
    }
}))

// --- edit campground ---
router.put('/:id', validateCampgroundSchema,catchAsync(async (req,res)=>{
    const { id } = req.params
    const { title, location } = req.body.campground
    const campground = await Campground.findByIdAndUpdate(id,{title:title,location:location},{runValidators: true, new: true})
    req.flash('success', `Successfully updated this location : ${title}`);
    res.redirect(`/campground/${campground._id}`)
}))

// --- delete campground ---
router.delete('/:id', catchAsync(async (req,res)=>{
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', `Deleted this ID: '${id}' Successfully!`);
    res.redirect(`/campground`)
}))
// --- inquiry detail ---
router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const campgrounds = await Campground.findById(id).populate('reviews')
    if (!campgrounds) {
        req.flash('error', `Cannot find that campground`);
        res.redirect('/campground')
    } else {
        res.render('campgrounds/show',{campgrounds,})
    }
})

module.exports = router