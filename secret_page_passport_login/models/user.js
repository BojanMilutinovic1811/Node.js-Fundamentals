const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = mongoose.Schema({
    name: String, 
    passport: String
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('secretUser', userSchema)

module.exports = User; 