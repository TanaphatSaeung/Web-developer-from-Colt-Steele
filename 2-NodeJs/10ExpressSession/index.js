const express = require('express')
const app = express()
const session = require('express-session')

const sessionOptions = {
    secret: 'thisissecret',
    resave: false,
    saveUninitialized: false,
}

app.use(session(sessionOptions))

app.get('/viewcount',(req,res,next)=>{
    if (req.session.count) {
        req.session.count += 1
        res.send(`U have view this page ${req.session.count} times`)
    } else {
        req.session.count = 1
        res.send(`First time?`)
    }
})

app.get('/register',(req,res)=>{
    const { username = 'Anonymous' } = req.query
    req.session.username = username
    res.redirect('/greet')
})

app.get('/greet',(req,res) => {
    const { username } = req.session
    res.send(`Hi ${username}!`)
})

app.listen('3000',()=>{
    console.log('Server is running on port 3000');
})