const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {ensureAuthenticated} = require('../helpers/auth');

require('../models/Ideas')
const Idea = mongoose.model('ideas')

router.get('/', ensureAuthenticated, (req, res) => {

    Idea.find({user: req.user.id})
    .sort({date: 'desc'})
    .then(ideas => {
        res.render('./ideas/indexIdeas', {ideas})
    })

})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        if(idea.user != req.user.id) {
            req.flash('error_msg', 'Not authorized!')
            res.redirect('/ideas')
        } else {
            res.render('./ideas/editIdea', {idea})
        }
    })
})

router.put('/:id', ensureAuthenticated, (req, res) => {

    Idea.findOne({
        _id: req.params.id
    }).then( idea => {
        idea.title = req.body.title;
        idea.details = req.body.details; 

        idea.save()
        .then(idea => {
        req.flash('success_msg', 'Video idea updated')

            res.redirect('/ideas')
        })
    } )
})

router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.deleteOne({
        _id: req.params.id
    }).then(()=> {
        req.flash('success_msg', 'Video idea removed')
        res.redirect('/ideas')
    } )
})

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('./ideas/addIdea')
})

router.post('/', ensureAuthenticated, (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details,
        user: req.user.id
    }

    new Idea(newUser).save()
        .then(idea => {
        req.flash('success_msg', 'Video idea added')

            res.redirect('/ideas')
        })
})



module.exports = router; 