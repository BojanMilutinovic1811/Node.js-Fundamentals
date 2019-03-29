const express = require('express')
const router = express.Router()

const Campground = require('../models/Campground')

router.get("/", (req, res) => {
    Campground.find({})
        .then(campgrounds => res.render("campgrounds/index", { campgrounds }))
        .catch(err => console.log(err))
});

router.post('/', (req, res) => {
    const newCampground = req.body.campgrounds
    Campground.create(newCampground)
        .then(() => res.redirect('/campgrounds'))
        .catch(err => console.log(err))
})

router.get('/new', (req, res) => res.render('campgrounds/new'))


router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec()
        .then(campground => res.render('campgrounds/show', { campground }))
        .catch(err => console.log(err))
})


module.exports = router; 