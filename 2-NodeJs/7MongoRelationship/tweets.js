const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
    .then(()=>{
        console.log('Mongo Connected');
    })
    .catch((e)=>{
        console.log(`Mongo Error: ${e}`);
    })

const userSchema = new Schema({
    username: String,
    age: Number,
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User',userSchema )
const Tweet = mongoose.model('Tweet',tweetSchema )

const makeTweet = async() =>{
    const user = await User.findOne({username: 'checkenfan99'})
    const tweet2 = new Tweet({ text:'bock bock bock my chickens make noises', likes: 1289})
    tweet2.user = user
    tweet2.save()
}

makeTweet()

const findTweet = async() => {
    const t = await Tweet.find({}).populate('user','username')
    console.log(t);
    
}

findTweet()