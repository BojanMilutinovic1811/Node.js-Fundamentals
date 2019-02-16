const express = require('express');
const app = express();
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const User = require('./models/user')
const express_session = require('express-session')

mongoose.connect('mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true', { useNewUrlParser: true }, ()=>console.log('db connected'))


app.set('view engine', 'ejs')

app.use(body_parser.urlencoded({extended: true}))

app.use(express_session({
    secret: 'the truth is out there',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', (req, res) => {
    console.log(req.body.username, req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/register')
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/secret')
        })
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}))

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})



app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret')
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}


const port = process.env.port || 3000; 

app.listen(port, () => console.log(`secret page app running on port ${port}`))