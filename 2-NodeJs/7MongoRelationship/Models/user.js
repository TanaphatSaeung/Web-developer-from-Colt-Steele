const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
    .then(()=>{
        console.log('Mongo Connected');
    })
    .catch((e)=>{
        console.log(`Mongo Error: ${e}`);
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {_id:false},
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = new mongoose.model('User',userSchema)

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter',
        })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA',
    })
    await u.save()
}

const addAddress = async(id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: '99 3rd St.',
        city: 'New York',
        state: 'NY',
        country: 'USA',
    })
    await user.save()
}
makeUser()
addAddress('693975eed0cb3731065984f6')

