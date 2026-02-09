const Review = require('../models/review')
const Campground = require('../models/campgroud')

module.exports.reviewControllers = {
    create: async (req,res)=>{
        const campground = await Campground.findById(req.params.id)
        const review = new Review(req.body.reviews)
        review.author = req.user._id
        campground.reviews.push(review)
        await review.save()
        await campground.save()
        req.flash('success', `Created new review!`);
        res.redirect(`/campground/${campground._id}`)
    },
    delete: async (req,res) =>{
        const { id, reviewId } = req.params
        await Campground.findByIdAndUpdate(id, {$pull: {reviews : reviewId}})
        await Campground.findByIdAndDelete(reviewId)
        res.redirect(`/campground/${id}`)
    }
}