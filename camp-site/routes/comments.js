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

//editing comments

router.get('/:id/comments/:commentid/edit', checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            Comment.findById(req.params.commentid)
                .then((comment) => {
                    console.log(comment._id);
                    res.render('comments/edit', { campground, comment })
                })
        })
})

router.put('/:id/comments/:commentid', checkCommentOwnership, (req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.commentid }, req.body.comment)
        .then((comment) => {
            res.redirect('/campgrounds/' + req.params.id)
        })
})

// deleting comments 

router.delete('/:id/comments/:commentid', checkCommentOwnership, (req, res) => {
    Comment.findOneAndDelete({ _id: req.params.commentid })
        .then(() => res.redirect('/campgrounds/' + req.params.id))
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentid)
            .then(comment => {
                if (comment.author.id.equals(req.user._id)) {
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