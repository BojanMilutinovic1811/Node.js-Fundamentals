const express = require('express')
const router = express.Router()
const Campground = require('../models/Campground')
const Comment = require('../models/Comment')

router.get('/:id/comments/new', (req, res) => {
    console.log(req.params)
    Campground.findById(req.params.id)
        .then(campground => {
            console.log(campground)
            res.render('comments/new', { campground })
        })
})

router.post('/:id/comments', (req, res) => {
    console.log('making comment')
    Campground.findById(req.params.id)
        .then(campground => {
            Comment.create(req.body.comment)
                .then(comment => {

                    campground.comments.push(comment)
                    campground.save()
                    res.redirect('/campgrounds/' + campground._id)
                })
        })
})



module.exports = router; 