const express = require('express');
const app = express();
const index = require('./routes/index')
const users = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');


const db = require('./configuration/keys');


mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('db connected'))
    .catch(err => console.log(err));

app.use(expressLayouts);
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({extended: true}));

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  app.use(flash());

  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

app.use('/', index);
app.use('/users', users)



const PORT = process.env.PORT || 3000


app.listen(PORT, console.log(`Server started on port ${PORT}`))



