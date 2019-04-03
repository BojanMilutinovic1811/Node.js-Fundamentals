const express = require('express')
const router = express.Router()
const Campground = require('../models/Campground')
const Comment = require('../models/Comment')

router.get('/:id/comments/new', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id)
        .then(campground => {
            res.render('comments/new', { campground })
        })
})

router.post('/:id/comments', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id)
        .then(campground => {
            Comment.create(req.body.comment)
                .then(comment => {

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect('/campgrounds/' + campground._id)
                })
        })
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


module.exports = router; 