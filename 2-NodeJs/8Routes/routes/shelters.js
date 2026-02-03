const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('ALL Shelters!!')
})
router.post('/',(req,res)=>{
    res.send('Creating Shelter')
})
router.get('/:id',(req,res)=>{
    res.send('one Shelter')
})
router.get('/:id/edit',(req,res)=>{
    res.send('Editing the Shelter')
})

module.exports = router