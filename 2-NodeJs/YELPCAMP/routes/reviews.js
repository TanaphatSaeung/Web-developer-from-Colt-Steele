const express = require('express')
const router = express.Router({ mergeParams: true })
const Campground = require('../models/campgroud')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Review = require('../models/review')
const { isLoggedIn,validateReviewSchema,isReviewer } = require('../middleware')

// --- create review rating and comment ---
router.post('/', isLoggedIn,validateReviewSchema, catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.reviews)
    review.author = req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', `Created new review!`);
    res.redirect(`/campground/${campground._id}`)
}))

// --- delete review ---
router.delete('/:reviewId', isLoggedIn, isReviewer,catchAsync(async (req,res) =>{
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews : reviewId}})
    await Campground.findByIdAndDelete(reviewId)
    res.redirect(`/campground/${id}`)
}))

module.exports = router