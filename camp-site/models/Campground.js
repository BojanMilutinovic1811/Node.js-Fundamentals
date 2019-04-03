const mongoose = require('mongoose')

const campgroundSchema = new mongoose.Schema({
    location: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CampgroundUser'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CampgroundComment'
        }
    ]
})

const Campground = mongoose.model('Campground', campgroundSchema)

module.exports = Campground