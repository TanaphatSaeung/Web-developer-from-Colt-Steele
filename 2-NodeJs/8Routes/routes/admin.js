const express = require('express')
const router = express.Router()
// --- midleware ---
router.use((req,res,next) => {
    if (req.query.isAdmin) {
        next()
    }
    res.send('Sorry ur not an admin :(')
})
// --- routes ---
router.get('/topsecret',(req,res)=>{
    res.send('This is top secret')
})
router.get('/deleteeverthing',(req,res)=>{
    res.send('Deleted')
})

module.exports = router