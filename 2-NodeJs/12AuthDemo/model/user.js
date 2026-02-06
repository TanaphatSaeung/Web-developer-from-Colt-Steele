const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blanked']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blanked']
    }
})

userSchema.statics.findAndValidate = async function (username,password) {
    const foundUser = await this.findOne({ username })    
    const validPassword = await bcrypt.compare(password, foundUser.password)
    return validPassword? foundUser: false
}
// before .save, this middleware will trigger 
userSchema.pre('save', async function() {
    if(!this.isModified('password')) return    
    this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model('User', userSchema)