const mongoose = require('mongoose')

const campgroundSchema = new mongoose.Schema({
    location: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CampgroundComment'
        }
    ]
})

const Campground = mongoose.model('Campground', campgroundSchema)

module.exports = Campground