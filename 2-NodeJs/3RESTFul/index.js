const express = require('express')
const path = require('node:path')
const { v4: uuid} = require('uuid')
const methodOverride = require('method-override')
const app = express()
const port = 8989

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
  {
    id: uuid(),
    "username": "cloudwalker",
    "comment": "Loving the progress on this project. The flow feels smoother than yesterday’s sunrise."
  },
  {
    id: uuid(),
    "username": "byteforge",
    "comment": "Code looks clean and crisp — like it just stepped out of a digital spa."
  },
  {
    id: uuid(),
    "username": "sunnydebugger",
    "comment": "Tested the new endpoint. Works great, though it whispers for more optimization."
  },
  {
    id: uuid(),
    "username": "zenstack",
    "comment": "This feature gave me exactly the dopamine hit I needed today."
  },
  {
    id: uuid(),
    "username": "keystroke_kiwi",
    "comment": "UI is neat, API is neat, everything is neatly neat. Approving this with cheerful keystrokes."
  }
]
// get all
app.get('/comments', (req, res) => {
  res.render('comments/index', {comments});
});

// get then send data to post
app.get('/comments/new', (req, res) => {
  res.render('comments/new', {comments});
});

// create
app.post('/comments', (req, res) => {
  const {username, comment} =req.body
  comments.push({
    username: username,
    comment: comment,
    id: uuid(),
  })
  res.redirect('/comments')
});
// get by id
app.get('/comments/:id',(req,res)=>{
    const { id } = (req.params)
    const result = comments.find((c) => c.id === id)
    res.render('comments/show', {comments:result});
})

// edit
app.get('/comments/:id/edit',(req,res)=>{
    const { id } = (req.params)
    const comment = comments.find((c) => c.id === id)
    res.render('comments/edit', {comment})
})

// update
app.patch('/comments/:id',(req,res)=>{
    const { id } = (req.params)
    const newComment = req.body.comment
    const curComment = comments.find((c) => c.id === id)
    curComment.comment = newComment
    res.redirect('/comments')
})

// delete
app.delete('/comments/:id',(req,res)=>{
    const { id } = (req.params)
    comments = comments.filter(c => c.id !== id )
    res.redirect('/comments')
})

app.get('/tacos',(req,res)=>{
    res.send("Get")
})
app.post('/tacos',(req,res)=>{
    const { meat, qty } = req.body

    res.send(`<h1>OK, here are your ${qty} ${meat}</h1>`)
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
    
})