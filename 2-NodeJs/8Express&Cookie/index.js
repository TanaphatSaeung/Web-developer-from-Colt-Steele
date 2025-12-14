const express = require('express')
const app = express()
// const shelterRoutes = require('./routes/shelters')
// const dogRoutes = require('./routes/dogs')
// const adminRoute = require('./routes/admin')

// app.use('/shelters',shelterRoutes)
// app.use('/dogs',dogRoutes)
// app.use('/admin',adminRoute )

app.get('/greet', (req,res)=>{
    res.send('Hey there')
})

app.get('/setName',(req,res)=>{
    res.cookie('name','gusty')
    res.cookie('animal','harlequin shrimp')
    res.send('Sent your cookie!')
})

app.listen(3000, () => {
    console.log('Server is running on Port: 3000');
})
