const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User')
const methodOverride = require('method-override')
const flash = require('connect-flash')

//routes
const campgrounds = require('./routes/campgrounds')
const auth = require('./routes/auth')
const comments = require('./routes/comments')

const app = express();


const database = require('./config/keys').mongoURI;
mongoose.connect(database, {
  useNewUrlParser: true
}, () => console.log('data base connected'))


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))
app.use(flash())




// passport configuration
app.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//setting up local for current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})

app.get("/", (req, res) => {
  res.render("home");
});

app.use('/', auth)
app.use('/campgrounds', campgrounds)
app.use('/campgrounds', comments)




app.listen(3001, () => console.log("app runnin on port 3001"));
