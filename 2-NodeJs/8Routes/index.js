const express = require('express')
const app = express()
const shelterRoutes = require('./routes/shelters')
const dogRoutes = require('./routes/dogs')
const adminRoute = require('./routes/admin')

app.use('/shelters', shelterRoutes)
app.use('/dogs', dogRoutes)
app.use('/', adminRoute)


app.listen(3300,()=>{
    console.log('Server is running on port 3300');
})