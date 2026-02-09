const express = require('express')
const router = express.Router({ mergeParams: true })
const Campground = require('../models/campgroud')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {reviewControllers} = require('../controllers/reviews')

const { isLoggedIn,validateReviewSchema,isReviewer } = require('../middleware')

// --- create review rating and comment ---
router.post('/', isLoggedIn,validateReviewSchema, catchAsync(reviewControllers.create))

// --- delete review ---
router.delete('/:reviewId', isLoggedIn, isReviewer,catchAsync(reviewControllers.delete))

module.exports = router