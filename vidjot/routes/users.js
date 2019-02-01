const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const mongoose = require('mongoose')
const router = express.Router();

require('../models/User')
const User = mongoose.model('vidjotUser')


router.get('/register', (req, res) => {
    res.render('./users/register')
})

router.get('/login', (req, res) => {
    res.render('./users/login')
})


router.post('/register', (req, res) => {

    let errors = [];

    if(req.body.password !== req.body.passwordconfirm) {
        errors.push({text: 'Passwords dont match!'})
    }

    if(req.body.password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters'})
    }

    if(errors.length > 0) {
        res.render('users/register', {
            errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordconfirm: req.body.passwordconfirm
        }) 
        } else {
            User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    req.flash('error_msg', 'That mail is already registered')
                    res.redirect('/users/register')
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
        
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err
                            newUser.password = hash; 
                            newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                        })
                    })
                    console.log(newUser);
                }
            })
    }
    
})




module.exports = router; 