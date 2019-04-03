const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CampgroundUser'
        },
        username: String
    },
    text: String
})

const CampgroundComment = mongoose.model('CampgroundComment', commentSchema)

module.exports = CampgroundComment; 