const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('All Dogs')
})
router.get('/:id',(req,res)=>{
    res.send('one dog')
})
router.get('/:id/edit',(req,res)=>{
    res.send('edit that Dawg')
})

module.exports = router