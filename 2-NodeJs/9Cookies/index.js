const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser('thisismysecret'))
app.get('/getsignedcookie',(req,res)=>{
    res.cookie('fruit','grape', {signed:true})
    res.send('Cookie has signed')
})
app.get('/verifyfruit',(req,res)=>{
    const { fruit } = req.signedCookies
    res.send(fruit)
})

app.get('/greet',(req,res)=>{
    const { name = 'Anonymous' } = req.cookies
    res.send(`Hi there! : ${name}`)
})
app.get('/setname',(req,res)=>{
    res.cookie('name','Halen Bunbun')
    res.cookie('animal','Bunny')
    res.send('Cookies')
})


app.listen('3000',() => {
    console.log('server is running on port 3000');  
})