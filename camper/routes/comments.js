const express = require('express')
const router = express.Router()
const Campground = require('../models/Campground')
const Comment = require('../models/Comment')
const middleware = require('../middleware')

// router.get('/:id/comments/new', middleware.isLoggedIn, (req, res) => {
//     Campground.findById(req.params.id)
//         .then(campground => {
//             res.render('comments/new', { campground })
//         })
// })

router.post('/:id/comments', middleware.isLoggedIn, (req, res) => {
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

router.get('/:id/comments/:commentid/edit', middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            Comment.findById(req.params.commentid)
                .then((comment) => {
                    console.log(comment._id);
                    res.render('comments/edit', { campground, comment })
                })
        })
})

router.put('/:id/comments/:commentid', middleware.checkCommentOwnership, (req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.commentid }, req.body.comment)
        .then((comment) => {
            res.redirect('/campgrounds/' + req.params.id)
        })
})

// deleting comments 

router.delete('/:id/comments/:commentid', middleware.checkCommentOwnership, (req, res) => {
    Comment.findOneAndDelete({ _id: req.params.commentid })
        .then(() => res.redirect('/campgrounds/' + req.params.id))
})


module.exports = router; 