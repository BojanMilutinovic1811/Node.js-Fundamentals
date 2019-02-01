const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/Ideas')
const Idea = mongoose.model('ideas')

router.get('/', (req, res) => {

    Idea.find({})
    .sort({date: 'desc'})
    .then(ideas => {
        res.render('./ideas/indexIdeas', {ideas})
    })

})

router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        console.log(idea);
        res.render('./ideas/editIdea', {idea})
    })
})

router.put('/:id', (req, res) => {

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

router.delete('/:id', (req, res) => {
    Idea.deleteOne({
        _id: req.params.id
    }).then(()=> {
        req.flash('success_msg', 'Video idea removed')
        res.redirect('/ideas')
    } )
})

router.get('/add', (req, res) => {
    res.render('./ideas/addIdea')
})

router.post('/', (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details
    }

    new Idea(newUser).save()
        .then(idea => {
        req.flash('success_msg', 'Video idea added')

            res.redirect('/ideas')
        })
})



module.exports = router; 