const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../models/User')



router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {

    const {name, email, password, password2} = req.body; 
    const errors = [];

    if ( !name || !email || !password || !password2) {
        errors.push({message: 'Please enter all fields.'})
    }

    if ( password !== password2) {
        errors.push({message: 'Passwords do not match.'})
    }

    if ( password.length < 6 ) {
        errors.push({message: 'Password must be at least 6 characters long.'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })

    } else {
      User.findOne({email})
        .then(user => {
            if(user) {
                errors.push({message: 'Email already exists.'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err; 
                        newUser.password = hash;
                        newUser.save()
                            .then( user => {
                                req.flash(
                                    'success_msg',
                                    'You are now register and can log in'
                                )
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    })
                })
            }
        })

    }

    
    
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });


module.exports = router; 