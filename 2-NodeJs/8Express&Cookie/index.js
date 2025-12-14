const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

app.use(cookieParser('thisismysecret')) // signed-cookie

// const shelterRoutes = require('./routes/shelters')
// const dogRoutes = require('./routes/dogs')
// const adminRoute = require('./routes/admin')

// app.use('/shelters',shelterRoutes)
// app.use('/dogs',dogRoutes)
// app.use('/admin',adminRoute )

app.get('/greet', (req,res)=>{
    const { name = 'anonymous' } = req.cookies
    res.send(`Hey there, ${name}`)
})

app.get('/setName',(req,res)=>{
    res.cookie('name','gusty')
    res.cookie('animal','harlequin shrimp')
    res.send('Sent your cookie!')
})

app.get('/getsignedcookies', (req,res)=>{
    res.cookie('fruit','grape', { signed: true })
    res.send('SIGNED YOUR COOKIE ALREADY')
})


app.get('/verifyfruit', (req,res)=>{
    const { fruit } = req.signedCookies
    res.send(fruit)
})

app.listen(3000, () => {
    console.log('Server is running on Port: 3000');
})
