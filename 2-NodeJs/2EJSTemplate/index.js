const express = require('express')
const app = express()
const path = require('node:path')
const data = require('./data.json')
const port = 8888

app.use(express.static(path.join(__dirname,'/public')))
    
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views') ) // make it more roburst

app.get('/home', (req,res)=>{
    res.render('home.ejs', {title: 'home'})
})

app.get('/cats',(req,res)=>{
    const cats = [
        'Blue','Rocket','Morty','Stephanie','Winston','Halen'
    ]
    res.render('cats', { cats, title: 'cats'})

})

app.get('/rand', (req,res)=>{
    const num = Math.floor(Math.random()*10) +1
    res.render('random.ejs', { rand:num, title: 'random' })
})

app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params
    const dato = data[subreddit]
    
    res.render('subreddit',{subreddit,dato, title: 'reddit'})
})

app.listen(port, ()=>{
    console.log(`this server is running on port: ${port}`);
})