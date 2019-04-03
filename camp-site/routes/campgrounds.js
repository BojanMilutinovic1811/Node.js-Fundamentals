const express = require('express')
const router = express.Router()

const Campground = require('../models/Campground')

router.get("/", (req, res) => {
    Campground.find({})
        .then(campgrounds => res.render("campgrounds/index", { campgrounds }))
        .catch(err => console.log(err))
});

router.post('/', isLoggedIn, (req, res) => {
    const newCampground = req.body.campgrounds
    newCampground.author = { id: req.user._id, username: req.user.username }
    console.log(newCampground)
    Campground.create(newCampground)
        .then(() => res.redirect('/campgrounds'))
        .catch(err => console.log(err))
})

router.get('/new', isLoggedIn, (req, res) => res.render('campgrounds/new'))


router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate('comments').exec()
        .then(campground => res.render('campgrounds/show', { campground }))
        .catch(err => console.log(err))
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


module.exports = router; 