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
            author: '698992951abe6a302ade172e',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dra9l0qzo/image/upload/v1770697069/YelpCamp/pf8a2cpzhkb0bsxzhwru.jpg',
                    filename: 'YelpCamp/pf8a2cpzhkb0bsxzhwru',
                },
                {
                    url: 'https://res.cloudinary.com/dra9l0qzo/image/upload/v1770697070/YelpCamp/dwos9qyfz5wrvb59xcln.jpg',
                    filename: 'YelpCamp/dwos9qyfz5wrvb59xcln',                    
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam quam labore dolores eaque modi ipsa error? Error nulla alias esse deleniti minima quaerat odit fuga eligendi hic! Nobis, earum suscipit.',
            price,
        })
        await camp.save()
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
})