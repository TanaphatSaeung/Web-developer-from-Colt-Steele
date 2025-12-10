const express = require('express')
const app = express()
const AppError = require('./appError')
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
    throw new AppError('Password required!',401)
}
// -------------------------

app.get('/',(req,res)=>{
    res.send('Home!')
})

app.get('/error',(req,res)=>{
    throw new Error('Alright This is your Error!!')
})

app.get('/dogs',(req,res)=>{
    res.send('Woof!')
})
// --- secret ---
app.get('/secret',verifyPassword, (req,res)=>{
    res.send('Nothing secret in this world!')
})

// --- admin ---
app.get('/admin', (req,res)=>{
    throw new AppError("You're not an admin!!",403)
})

// last 
app.use((req,res)=>{
    res.status(404).send('NOT FOUND!')
})

// --- Error Handler ---
app.use((err,req,res,next)=>{
    const {status = 500, message = 'Something went Wrong'} = err
    res.status(status).send(message)
})

app.listen('9000',()=>{
    console.log('SERVER IS RUNNING ON PORT: 9000');
})