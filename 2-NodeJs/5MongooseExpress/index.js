const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Product = require('./models/product')
// --------------------------------------
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
const path = require('node:path')
const port = 8888
const categories = ['fruit','vegetable','dairy','fungi']
// --------------------------------------
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(()=>{
        console.log('Mongo Connection Open!');
    })
    .catch((err)=>{
        console.log(`Mongo Connection Error: ${err}`);
    })

// --------------------------------------
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
// --- inquiry index ---
app.get('/products',async (req,res)=>{
    const { category } = req.query
    if (category) {
        const products = await Product.find({category})
        res.render('products/index',{products,category})
    }else{
        const products = await Product.find({})
        res.render('products/index',{products,category: 'All'})
    }
    
    
    
})
// --- Create a new Product ---
app.post('/products',async (req,res)=>{
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})
// --- Create  ---
app.get('/products/new', async (req,res)=> {
    res.render('products/new',{categories})
})
// --- Detail ---
app.get('/products/:id',async (req,res)=>{
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show', {product})
})

// --- Edit Product ---
app.put('/products/:id',async (req,res)=>{
    const {name, price, category} = req.body
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, {name:name, price: price, category: category}, {runValidators: true, new: true})
    res.redirect(`/products/${ product._id }`)
})

// --- Edit ---
app.get('/products/:id/edit',async (req,res)=>{
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit', {product,categories})
})

// --- delete ---
app.delete('/products/:id',async (req,res)=>{
    const { id } = req.params
    await Product.findByIdAndDelete(id, { new: true })
    res.redirect(`/products`)
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})