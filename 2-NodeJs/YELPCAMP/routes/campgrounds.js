const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn,validateCampgroundSchema, isAuthor } = require('../middleware')
const Campground = require('../models/campgroud')

// --- inquiry ---
router.get('/', async (req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
})

// --- new campground ---
router.get('/new', isLoggedIn,async (req,res)=>{
    res.render('campgrounds/new')
})
// --- new campground ---
router.post('/', isLoggedIn,validateCampgroundSchema,catchAsync(async (req,res,next)=>{
    // --- Insert new camp! ---
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campground/${campground._id}`);
}))

// --- edit campground ---
router.get('/:id/edit', isLoggedIn,isAuthor,catchAsync(async (req,res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', `Cannot find that campground`);
        return res.redirect('/campground')
    }
    res.render('campgrounds/edit',{campground})
}))

// --- edit campground ---
router.put('/:id', isLoggedIn,isAuthor,validateCampgroundSchema,catchAsync(async (req,res)=>{
    const { id } = req.params
    const { title, location } = req.body.campground
    const campground = await Campground.findByIdAndUpdate(id,{title:title,location:location},{runValidators: true, new: true})
    req.flash('success', `Successfully updated this location : ${title}`);
    res.redirect(`/campground/${campground._id}`)
}))

// --- delete campground ---
router.delete('/:id', isLoggedIn, isAuthor,catchAsync(async (req,res)=>{
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', `Deleted this ID: '${id}' Successfully!`);
    res.redirect(`/campground`)
}))
// --- inquiry detail ---
router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const campgrounds = await Campground.findById(id).populate({
        path:'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if (!campgrounds) {
        req.flash('error', `Cannot find that campground`);
        return res.redirect('/campground')
    }
    res.render('campgrounds/show',{campgrounds})
})

module.exports = router