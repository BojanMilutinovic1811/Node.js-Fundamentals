const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String, 
        reqired: true
    },
    password: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User; 