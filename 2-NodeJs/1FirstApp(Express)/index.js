const express = require('express')
const app = express()
const port = 8888

app.use(express.json())

app.get('/cats',(req,res)=>{
    const body = req.body
    console.log(body);
    res.send('Yo')
})

app.get('/r/:sub',(req,res)=>{
    const { sub } = req.params
    res.send(`<h1> Browsing to ${sub} </h1>`)
})

app.get('/seacrh', (req,res) => {
    const { q } = req.query
    if (!q) {
        res.send(`Nothing found`)
    }
    res.send(`searching for:  ${q}`)
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})