const { campgroundJoiSchema,reviewJoiSchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Campground = require('./models/campgroud')
const Review = require('./models/review')

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be signed in first!')
        return res.redirect('/login')
    }
    next()
}

// --- Joi Validation campground ---
module.exports.validateCampgroundSchema = (req,res,next) => {
    // --- Error Handling ---
    const {error} = campgroundJoiSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else {
        next()
    }
}

// --- Authorization ---
// --- Campground ---
module.exports.isAuthor = async (req,res,next) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to edit')
        return res.redirect(`/campground/${id}`)
    }
    next()
}
// --- review ---
module.exports.isReviewer = async (req,res,next) => {
    const {id, reviewId} = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to delete this')
        return res.redirect(`/campground/${id}`)
    }
    next()
}

// --- Joi Validation review ---
module.exports.validateReviewSchema = (req,res,next) => {
    // --- Error Handling ---
    const {error} = reviewJoiSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else {
        next()
    }
}