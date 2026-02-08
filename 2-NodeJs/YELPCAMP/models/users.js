const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PassportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
})

userSchema.plugin(PassportLocalMongoose.default) 
// this plugin is goning to add a username , stores hash and salt (and some metadata), which matches what you saw in the saved document
// also checking is this username exist

module.exports = mongoose.model('User', userSchema)