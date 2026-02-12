const Campground = require('../models/campgroud')
const {cloudinary} = require('../cloudinary/index')
// --- get map API --
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.campgroundControllers = {
    index: async (req,res) => {
        const campgrounds = await Campground.find({})
        res.render('campgrounds/index',{campgrounds})
    },
    detail: async (req,res)=>{
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
    },
    create: async (req,res)=>{
        res.render('campgrounds/new')
    },
    createPost: async (req,res)=>{
        const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
        console.log(geoData);
        if (!geoData.features?.length) {
            req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
            return res.redirect('/campgrounds/new');
        }
        const campground = new Campground(req.body.campground);
        // --- map ---
        campground.geometry = geoData.features[0].geometry;
        campground.location = geoData.features[0].place_name;
        // -----------
        campground.images = req.files.map(f => ({url: f.path, filename: f.filename}))
        campground.author = req.user._id
        console.log(campground);
        
        await campground.save();
        req.flash('success', 'Successfully made a new campground!');
        res.redirect(`/campground/${campground._id}`);
    },
    edit: async (req,res) => {
        const {id} = req.params
        const campground = await Campground.findById(id)
        if (!campground) {
            req.flash('error', `Cannot find that campground`);
            return res.redirect('/campground')
        }
        res.render('campgrounds/edit',{campground})
    },
    editPost: async (req,res)=>{
        const { id } = req.params
        const { title, location } = req.body.campground
        const geoData = await maptilerClient.geocoding.forward(location, { limit: 1 });
        console.log(geoData);
        if (!geoData.features?.length) {
            req.flash('error', 'Could not geocode that location. Please try again and enter a valid location.');
            return res.redirect(`/campgrounds/${id}/edit`);
        }

        const campground = await Campground.findByIdAndUpdate(id,{title:title,location:location},{runValidators: true, new: true})
        // --- map ---
        campground.geometry = geoData.features[0].geometry;
        campground.location = geoData.features[0].place_name;
        // -----------
        const images = req.files.map(f => ({url: f.path, filename: f.filename}))
        campground.images.push(...images)
        await campground.save()
        if (req.body.deleteImages) {
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename)
            }
            await campground.updateOne({ $pull: {images: {filename: {$in: req.body.deleteImages}}}})
        }
        req.flash('success', `Successfully updated this location : ${title}`);
        res.redirect(`/campground/${campground._id}`)
    },
    delete: async (req,res)=>{
        const { id } = req.params
        await Campground.findByIdAndDelete(id)
        req.flash('success', `Deleted this ID: '${id}' Successfully!`);
        res.redirect(`/campground`)
    },

}