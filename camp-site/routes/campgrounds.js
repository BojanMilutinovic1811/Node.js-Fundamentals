const express = require('express')
const router = express.Router()

const Campground = require('../models/Campground')

router.get("/", (req, res) => {
    Campground.find({})
        .then(campgrounds => res.render("campgrounds/index", { campgrounds }))
        .catch(err => console.log(err))
});

router.post('/', isLoggedIn, (req, res) => {
    console.log(' getting to posting campground');
    const newCampground = req.body.campgrounds
    newCampground.author = { id: req.user._id, username: req.user.username }
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


//editing campgrounds

router.get('/:id/edit', checkUserOwnership, (req, res) => {
    console.log('we are getting to edit');
    Campground.findById(req.params.id)
        .then(campground => {
            res.render('campgrounds/edit', { campground })
        })
        .catch(() => res.redirect('/campgrounds'))
})

router.put('/:id', checkUserOwnership, (req, res) => {
    Campground.findOneAndUpdate({ _id: req.params.id }, req.body.campground)
        .then((campground) => res.redirect('/campgrounds/' + req.params.id))
        .catch(() => res.redirect('/campgrounds'))
})

// deleting campground


router.delete('/:id', checkUserOwnership, (req, res) => {
    Campground.findOneAndDelete({ _id: req.params.id })
        .then(res.redirect('/campgrounds'))
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('user is logged in')
        next()
    } else {
        res.redirect('/login')
    }
}

function checkUserOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id)
            .then(campground => {
                if (campground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/campgrounds')
            })
    } else {
        res.redirect('back')
    }

}


module.exports = router; 