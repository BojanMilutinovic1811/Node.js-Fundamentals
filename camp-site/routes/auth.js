const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')


router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', (req, res) => {
    const newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, (err, user) => {
        if (err) console.log(err);
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campgrounds')
        })
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login')

})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {
    console.log('loginauthentication')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/campgrounds')
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}



module.exports = router; 