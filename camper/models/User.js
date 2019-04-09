const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('CampgroundUser', userSchema);

module.exports = User; 