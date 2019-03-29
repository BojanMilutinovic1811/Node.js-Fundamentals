const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    author: String,
    text: String
})

const CampgroundComment = mongoose.model('CampgroundComment', commentSchema)

module.exports = CampgroundComment; 