const express = require('express')
var exphbs  = require('express-handlebars');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session') 
const path = require('path')
const passport = require('passport')


const app = express();

const ideas = require('./routes/ideas');
const users = require('./routes/users')

//passport config
require('./config/passport')(passport)

mongoose.connect('mongodb+srv://bojan:bojan@mongodbtest-mjihi.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
.then(()=> console.log('Mongo db connected'))
.catch(err => console.log(err))





app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')))


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'))


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())



app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; 
    next()
})




app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.use('/ideas', ideas)

app.use('/users', users)



const port = 3000; 

app.listen(port, ()=> console.log(`App started on port ${port}`))