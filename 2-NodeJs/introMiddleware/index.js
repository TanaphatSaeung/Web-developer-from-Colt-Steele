const express = require('express')
const app = express()

// --- morgan middleware ---
const morgan = require('morgan')
app.use(morgan('tiny'))
// --- defining middleware ---
app.use((req,res,next)=>{
    req.requestTime = Date.now()
    console.log(req.method, req.path);
    return next()    
})
app.use('/dogs',(req,res,next)=>{
    console.log('I love Dogs');
    return next()    
})

const verifyPassword = (req,res,next) => {
    const { password } = req.query
    if ( password === 'Gus' ){
        next()
    }
    res.send('You need a password!!')
}
// -------------------------

app.get('/',(req,res)=>{
    res.send('Home!')
})
app.get('/dogs',(req,res)=>{
    res.send('Woof!')
})
// --- secret ---
app.get('/secret',verifyPassword, (req,res)=>{
    res.send('Nothing secret in this world!')
})

// last 
app.use((req,res)=>{
    res.status(404).send('NOT FOUND!')
})

app.listen('9000',()=>{
    console.log('SERVER IS RUNNING ON PORT: 9000');
})