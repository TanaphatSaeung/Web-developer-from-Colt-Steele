const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn,validateCampgroundSchema, isAuthor } = require('../middleware')
const { campgroundControllers } = require('../controllers/campgrounds')

// --- inquiry ---
router.get('/', catchAsync(campgroundControllers.index))

// --- new campground ---
router.get('/new', isLoggedIn,campgroundControllers.create)
// --- new campground ---
router.post('/', isLoggedIn,validateCampgroundSchema,catchAsync(campgroundControllers.createPost))

// --- edit campground ---
router.get('/:id/edit', isLoggedIn,isAuthor,catchAsync(campgroundControllers.edit))

// --- edit campground ---
router.put('/:id', isLoggedIn,isAuthor,validateCampgroundSchema,catchAsync(campgroundControllers.editPost))

// --- delete campground ---
router.delete('/:id', isLoggedIn, isAuthor,catchAsync(campgroundControllers.delete))
// --- inquiry detail ---
router.get('/:id', campgroundControllers.detail)

module.exports = router