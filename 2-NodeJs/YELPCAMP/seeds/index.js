const mongoose = require('mongoose')
const Campground = require('../models/campgroud')
const cities = require('./cities')
const {descriptors,places} = require('./seedHelpers')
// --------------------------------
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log(`Mongo Connection Error: ${err}`);
    })
const db = mongoose.connection
// --------------------------------
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async() =>{
    await Campground.deleteMany({})
    for (let i = 0; i < 50 ; i++){
        const random1000 = Math.floor(Math.random()*1000)
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
        })
        await camp.save()
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
})