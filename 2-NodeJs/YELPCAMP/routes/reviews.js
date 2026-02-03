const express = require('express')
const router = express.Router({ mergeParams: true })
const { reviewJoiSchema } = require('../schemas')
const Campground = require('../models/campgroud')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Review = require('../models/review')

// --- Joi Validation ---
const validateReviewSchema = (req,res,next) => {
    // --- Error Handling ---
    const {error} = reviewJoiSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else {
        next()
    }
}

// --- create review rating and comment ---
router.post('/', validateReviewSchema, catchAsync(async (req,res)=>{
    const campground = await Campground.findById(req.params.id)
    console.log(campground);
    
    const review = new Review(req.body.reviews)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campground/${campground._id}`)
}))

// --- delete review ---
router.delete('/:reviewId', catchAsync(async (req,res) =>{
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews : reviewId}})
    await Campground.findByIdAndDelete(reviewId)
    res.redirect(`/campground/${id}`)
}))

module.exports = router