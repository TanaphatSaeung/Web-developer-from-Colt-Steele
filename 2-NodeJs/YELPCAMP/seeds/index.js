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
        const price = Math.floor(Math.random()* 20) + 10
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam quam labore dolores eaque modi ipsa error? Error nulla alias esse deleniti minima quaerat odit fuga eligendi hic! Nobis, earum suscipit.',
            price,
        })
        await camp.save()
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
})