const mongoose = require('mongoose')

const campgroundSchema = new mongoose.Schema({
    location: String,
    image: String,
    description: String
})

const Campground = mongoose.model('Campground', campgroundSchema)

module.exports = Campground