const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn,validateCampgroundSchema, isAuthor } = require('../middleware')
const { campgroundControllers } = require('../controllers/campgrounds')

router.route('/')
    .get(catchAsync(campgroundControllers.index)) // --- inquiry ---
    .post(isLoggedIn,validateCampgroundSchema,catchAsync(campgroundControllers.createPost)) // --- new campground ---

// --- new campground ---
router.get('/new', isLoggedIn,campgroundControllers.create)

router.route('/:id')
    .get(campgroundControllers.detail) // --- inquiry detail ---
    .put(isLoggedIn,isAuthor,validateCampgroundSchema,catchAsync(campgroundControllers.editPost)) // --- edit campground ---
    .delete(isLoggedIn, isAuthor,catchAsync(campgroundControllers.delete)) // --- delete campground ---

// --- edit campground ---
router.get('/:id/edit', isLoggedIn,isAuthor,catchAsync(campgroundControllers.edit))

module.exports = router